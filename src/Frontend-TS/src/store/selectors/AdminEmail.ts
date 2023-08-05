import { selector } from "recoil";
import { AdminState } from "../atoms/admin";

export const AdminEmail=selector({
    key : 'AdminEmailState',
    get : ({get})=>{
        const state=get(AdminState)
        return state.adminEmail
    },
});