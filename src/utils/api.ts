import { Platform } from 'react-native';
import { Appointment, Patient } from '../types';

const defaultHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
export const API_BASE_URL = `http://${defaultHost}:4000/api`;

type LoginResponse = {
  token: string;
  user: { id: string; email: string; name: string; role: string };
};

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message || 'API request failed');
  }
  return body as T;
};

export const api = {
  login: (email: string, password: string) =>
    request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  getPatients: (query = '') =>
    request<Patient[]>(`/patients${query ? `?q=${encodeURIComponent(query)}` : ''}`),
  createPatient: (patient: Omit<Patient, 'id' | 'lastVisit'>) =>
    request<Patient>('/patients', {
      method: 'POST',
      body: JSON.stringify(patient),
    }),
  getAppointments: () => request<Appointment[]>('/appointments'),
  createAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) =>
    request<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    }),
};
