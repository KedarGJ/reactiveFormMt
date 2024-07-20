import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES_META_DATA } from './shared/const/CountriesData';
import { CustomRegex } from './shared/const/ValidationPatterns';
import { nospacevalidator } from './shared/validators/noSpace';
import { EmpIdValidator } from './shared/validators/empIdValidators';
import { AsyncEmailValidator } from './shared/validators/asyncEmailValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reactiveFormMt';
  public signUpForm  !: FormGroup
  gendersArr : Array<string>=["female","male","others"]
   countryArr = COUNTRIES_META_DATA
    constructor(){
  
    }
  
    ngOnInit(): void {
      this.createSignUpForm();
  
      this.ispermandcurrentSame();
  
      this.patchPermanentAdd();
      this.confirmPasshandler();
      this.validateConfirmPass()
  
      
  
    }
  
    validateConfirmPass(){
      this.signUpForm.get('confirmPassword')
      ?.valueChanges.subscribe((res=>{
        if(this.f['password'].value !== res){
          this.signUpForm.get('confirmPassword')?.setErrors({invalid : true})
        }else{
          this.signUpForm.get('confirmPassword')?.setErrors(null)
        }
      }))
    }
  
    confirmPasshandler(){
      this.signUpForm.get('password')
      ?.valueChanges
       .subscribe(res=>{
        console.log(res);
        if(this.signUpForm.get('password')?.valid){
          this.signUpForm.get('confirmPassword')?.enable()
        }else{
          this.signUpForm.get('confirmPassword')?.disable()
        }
       })
    }
  
    patchPermanentAdd(){
      this.f['isAddSame']
        .valueChanges
        .subscribe(res=>{
          console.log(res);
          if(res){
            this.f['permanentAddress'].patchValue(this.f['currentAddress'].value);
            this.f['permanentAddress'].disable()
          }else{
            this.f['permanentAddress'].reset();
            this.f['permanentAddress'].enable();
          }
        })
    }
  
    ispermandcurrentSame(){
      this.signUpForm.get('currentAddress')?.valueChanges
          .subscribe(res => {
            console.log(res);
                console.log(this.signUpForm.get('currentAddress')?.valid);
                if(this.signUpForm.get('currentAddress')?.valid){
                  this.f['isAddSame'].enable()
                }else{
                this.f['isAddSame'].disable()
                    this.f['isAddSame'].patchValue(false)
              }
          })
  
  
         
    }
  
    createSignUpForm(){
      this.signUpForm = new FormGroup({
        userName : new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(12),
                  Validators.pattern(CustomRegex.username), nospacevalidator.noSpace]),
        email : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.email)],[AsyncEmailValidator.isEmailAvl]),
        empId: new FormControl(null, [Validators.required, EmpIdValidator.isEmpValid]),
        gender: new FormControl(null, [Validators.required]),
        currentAddress : new FormGroup({
          country:new FormControl(null,[Validators.required]),
          state:new FormControl(null,[Validators.required]),
          city:new FormControl(null,[Validators.required]),
          zipcode:new FormControl(null,[Validators.required,Validators.maxLength(6),Validators.minLength(6)]),
          
        }),
        permanentAddress : new FormGroup({
          country:new FormControl(null,[Validators.required]),
          state:new FormControl(null,[Validators.required]),
          city:new FormControl(null,[Validators.required]),
          zipcode:new FormControl(null,[Validators.required]),
          
        }),
        skills : new FormArray([new FormControl(null, [Validators.required])]),
        isAddSame : new FormControl({value:false, disabled:true}),
        password : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
        confirmPassword : new FormControl({value:null, disabled : true}, [Validators.required])
      })
    }
  
    OnSignUp(){
      if(this.signUpForm.valid){
        console.log(this.signUpForm);
        console.log(this.signUpForm.getRawValue())
      }
    }
  
  
    get f(){
      return this.signUpForm.controls
    }
  
    get getUsername() {
      return this.signUpForm.get('userName') as FormControl
    }
  
    get skillsFormArr(){
     return this.signUpForm.get('skills') as FormArray
    }
  
    onSkillAdd(){
      if(this.skillsFormArr.length < 5){
        let getSkillControl = new FormControl(null, [Validators.required]);
         this.skillsFormArr.push(getSkillControl)
      }
      
    }
  
    onSkillRemove(i : number){
      this.skillsFormArr.removeAt(i)
    }
}
