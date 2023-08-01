import { atom } from "recoil";

export const AdminState=atom({
    key:'AdminState',
    default:{
        isLoading:true,
        adminEmail:null
    },
})