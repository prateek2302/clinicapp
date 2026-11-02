import { Patient, Doctor, Appointment } from '../types';
export const patients: Patient[] = [
  { id:'1', name:'Aarav Sharma', age:34, gender:'M', phone:'+91 98765 43210', lastVisit:'2026-10-30', condition:'Hypertension' },
  { id:'2', name:'Neha Gupta', age:28, gender:'F', phone:'+91 98765 43211', lastVisit:'2026-10-29', condition:'Diabetes Type 2' },
  { id:'3', name:'Rahul Mehta', age:45, gender:'M', phone:'+91 98765 43212', lastVisit:'2026-10-28', condition:'Asthma' },
];
export const doctors: Doctor[] = [
  { id:'1', name:'Dr. Priya Singh', specialty:'Cardiologist', available:true, patientsToday:12 },
  { id:'2', name:'Dr. Ankit Verma', specialty:'Dermatologist', available:true, patientsToday:8 },
  { id:'3', name:'Dr. Sneha Patel', specialty:'General Physician', available:false, patientsToday:15 },
];
export const appointments: Appointment[] = [
  { id:'1', patientName:'Aarav Sharma', doctorName:'Dr. Priya Singh', time:'10:30 AM', date:'Today', status:'upcoming', type:'Consultation' },
  { id:'2', patientName:'Neha Gupta', doctorName:'Dr. Ankit Verma', time:'11:15 AM', date:'Today', status:'upcoming', type:'Follow-up' },
  { id:'3', patientName:'Rahul Mehta', doctorName:'Dr. Sneha Patel', time:'09:00 AM', date:'Today', status:'completed', type:'Check-up' },
];
