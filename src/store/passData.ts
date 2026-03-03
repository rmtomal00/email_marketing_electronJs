import { defineStore } from "pinia";
import { PassEmailAllData } from "../interfaces/send";

export const usePassEmailData = defineStore("emailDataPass",{
    state: ()=>({
        emailData: {} as PassEmailAllData | null
    }),
    actions: {
        setData(passData: PassEmailAllData){
            this.emailData = passData
        },
        clearAll(){
            this.emailData = null
        }
    }
})