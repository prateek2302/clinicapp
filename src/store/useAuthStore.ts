import { create } from 'zustand';
interface AuthState { isLoggedIn:boolean; role:string; login:(role?:string)=>void; logout:()=>void }
export const useAuthStore = create<AuthState>(set=>({
  isLoggedIn:false,
  role:'receptionist',
  login:(role='receptionist')=> set({isLoggedIn:true, role}),
  logout:()=> set({isLoggedIn:false}),
}));
