import { AbstractControl, ValidationErrors } from "@angular/forms";


export class EmpIdValidator {
    static isEmpValid(control:AbstractControl):ValidationErrors | null{
        let val=control.value as string
        if(val){
            let regexp = /^[A-Z]\d{3}$/;

            let isValid = regexp.test(val);

            if(isValid){
                return null
            }else{
                return{
                    invalidexp:'emp id should start with alphabet and ends with 3 numbers'
                }
            }
        }else{
            return null
        }
    }
}