import { selector } from "recoil";
import { AdminState } from "../atoms/admin";

export const IsLoading=selector({
    key:'IsLoadingState',
    get:({get})=>{
        const state=get(AdminState)
        return state.isLoading
    },
})