import { create } from 'zustand';
interface AuthState { isLoggedIn:boolean; role:string; login:()=>void; logout:()=>void }
export const useAuthStore = create<AuthState>(set=>({
  isLoggedIn:false,
  role:'receptionist',
  login:()=> set({isLoggedIn:true}),
  logout:()=> set({isLoggedIn:false}),
}));
