export type Role = 'doctor' | 'receptionist' | 'admin';
export interface Patient { id:string; name:string; age:number; gender:'M'|'F'|'Other'; phone:string; lastVisit:string; condition:string; avatar?:string }
export interface Doctor { id:string; name:string; specialty:string; available:boolean; patientsToday:number }
export interface Appointment { id:string; patientName:string; doctorName:string; time:string; date:string; status:'upcoming'|'completed'|'cancelled'; type:string }
