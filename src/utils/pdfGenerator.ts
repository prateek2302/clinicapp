
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export type Med = { name:string; dosage:string; duration:string; instruction:string };

export const generatePrescriptionPDF = async (data:{
  patientName:string;
  age:string;
  diagnosis:string;
  meds:Med[];
  advice:string;
  doctorName:string;
}) => {
  const medsHtml = data.meds.map((m,i)=>`
    <tr>
      <td style="padding:10px; border-bottom:1px solid #eee;">${i+1}</td>
      <td style="padding:10px; border-bottom:1px solid #eee;"><b>${m.name}</b><br/><small style="color:#666">${m.instruction}</small></td>
      <td style="padding:10px; border-bottom:1px solid #eee;">${m.dosage}</td>
      <td style="padding:10px; border-bottom:1px solid #eee;">${m.duration}</td>
    </tr>
  `).join('');

  const html = `
  <html>
  <head><style>
    body{font-family:Helvetica; padding:20px; color:#0F172A}
    .header{display:flex; justify-content:space-between; border-bottom:2px solid #2563EB; padding-bottom:12px}
    .clinic{font-size:22px; font-weight:800; color:#2563EB}
    table{width:100%; border-collapse:collapse; margin-top:16px}
    th{background:#F8FAFC; padding:10px; text-align:left; font-size:12px; text-transform:uppercase; color:#64748B}
  </style></head>
  <body>
    <div class="header">
      <div><div class="clinic">🏥 ClinicApp</div><div>Jaipur, Rajasthan • +91 98765 43210</div></div>
      <div style="text-align:right"><b>${data.doctorName}</b><br/>MBBS, MD<br/>Reg No: MCI-12345</div>
    </div>
    <h2 style="margin-top:20px">Prescription</h2>
    <p><b>Patient:</b> ${data.patientName} | ${data.age}<br/>
    <b>Date:</b> ${new Date().toLocaleDateString()}<br/>
    <b>Diagnosis:</b> ${data.diagnosis}</p>
    
    <table>
      <tr><th>#</th><th>Medicine</th><th>Dosage</th><th>Duration</th></tr>
      ${medsHtml}
    </table>

    <div style="margin-top:24px; background:#F8FAFC; padding:12px; border-radius:8px">
      <b>Advice:</b><br/>${data.advice}
    </div>

    <div style="margin-top:40px; text-align:right">
      <div style="border-top:1px solid #000; display:inline-block; padding-top:8px; min-width:160px; text-align:center">
        Doctor Signature<br/><small>${data.doctorName}</small>
      </div>
    </div>
    <p style="margin-top:40px; font-size:10px; color:#94A3B8; text-align:center">This is a digitally generated prescription. Valid for 7 days.</p>
  </body>
  </html>
  `;

  const options = { html, fileName: `Rx-${data.patientName.replace(/\s/g,'_')}-${Date.now()}`, directory:'Documents' };
  const file = await RNHTMLtoPDF.convert(options);
  return file.filePath;
};

export const sharePDF = async (filePath:string) => {
  await Share.open({ url: `file://${filePath}`, type:'application/pdf', title:'Prescription' });
};
