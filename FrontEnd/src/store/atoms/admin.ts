import { atom } from "recoil";

interface Admin {
    isLoading: boolean;
    adminEmail: string | null;
  }
  

export const AdminState=atom<Admin>({
    key:'AdminState',
    default:{
        isLoading:true,
        adminEmail:null
    },
})