import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";



export class AsyncEmailValidator{
    static isEmailAvl(control:AbstractControl) : Promise<ValidationErrors|null> |
                                                Observable<ValidationErrors|null>{
                        let val=control.value as string;
                        return new Promise((resolve,reject)=>{
                            setTimeout(() => {
                                if(val==='kgj@12gmail.com'){
                                    resolve({
                                        emailExixtErr:'this email is already in use'
                                    })
                                }else{
                                    resolve(null)
                                }
                            }, 3000);
                        })
                                                }
}