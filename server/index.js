const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT || 4000);
const DATA_FILE = path.join(__dirname, 'data.json');

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const writeData = data =>
  fs.writeFileSync(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`);
const send = (res, status, body) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  });
  res.end(JSON.stringify(body));
};
const readBody = req =>
  new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1024 * 1024) reject(new Error('Request body is too large'));
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Request body must be valid JSON'));
      }
    });
    req.on('error', reject);
  });

const requiredString = (value, field) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
};

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const route = url.pathname.replace(/\/+$/, '') || '/';

  try {
    if (req.method === 'GET' && route === '/health') {
      return send(res, 200, { status: 'ok', service: 'clinicapp-api' });
    }

    if (req.method === 'POST' && route === '/api/auth/login') {
      const { email, password } = await readBody(req);
      const data = readData();
      const user = data.users.find(
        candidate =>
          candidate.email === String(email || '').trim().toLowerCase() &&
          candidate.password === password,
      );
      if (!user) return send(res, 401, { message: 'Invalid email or password' });
      return send(res, 200, {
        token: crypto.randomBytes(24).toString('hex'),
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
    }

    if (req.method === 'GET' && route === '/api/patients') {
      const data = readData();
      const query = (url.searchParams.get('q') || '').toLowerCase();
      const patients = data.patients.filter(patient =>
        `${patient.name} ${patient.phone} ${patient.condition}`.toLowerCase().includes(query),
      );
      return send(res, 200, patients);
    }

    if (req.method === 'POST' && route === '/api/patients') {
      const body = await readBody(req);
      const patient = {
        id: `patient-${Date.now()}`,
        name: requiredString(body.name, 'name'),
        age: Number(body.age),
        gender: ['M', 'F', 'Other'].includes(body.gender) ? body.gender : 'Other',
        phone: requiredString(body.phone, 'phone'),
        condition: requiredString(body.condition, 'condition'),
        lastVisit: 'New patient',
      };
      if (!Number.isInteger(patient.age) || patient.age < 0 || patient.age > 120) {
        return send(res, 400, { message: 'age must be an integer between 0 and 120' });
      }
      const data = readData();
      data.patients.unshift(patient);
      writeData(data);
      return send(res, 201, patient);
    }

    if (req.method === 'GET' && route === '/api/appointments') {
      return send(res, 200, readData().appointments);
    }

    if (req.method === 'POST' && route === '/api/appointments') {
      const body = await readBody(req);
      const appointment = {
        id: `appointment-${Date.now()}`,
        patientName: requiredString(body.patientName, 'patientName'),
        doctorName: requiredString(body.doctorName, 'doctorName'),
        time: requiredString(body.time, 'time'),
        date: requiredString(body.date, 'date'),
        status: 'upcoming',
        type: requiredString(body.type, 'type'),
      };
      const data = readData();
      data.appointments.unshift(appointment);
      writeData(data);
      return send(res, 201, appointment);
    }

    return send(res, 404, { message: 'Route not found' });
  } catch (error) {
    return send(res, 400, { message: error.message || 'Request failed' });
  }
});

server.listen(PORT, () => {
  console.log(`ClinicApp API listening on http://localhost:${PORT}`);
});
