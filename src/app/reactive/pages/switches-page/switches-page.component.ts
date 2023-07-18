import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup= this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  })

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  public person = {
    gender: 'F',
    wantNoifications: false,
  }

  isValidField(field:string){
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }

  getFieldError(field:string):string | null{
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {}

    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`
      }
    }
    return null
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched()
      return
    }
/* Esto se hace porque tenemos un elemento llamado persona al cual queremos enviarle 
solo gender y wantNoifications y no los termsAndConditions, para eso se destructura el formulario,
sacamos termsAndConditions mediante la destructuracion y al lado hacemos una copia excluyendo lo que queremos sacar
asi si por ejemplo un backend nos pide que enviemos una data en especifico lo podemos hacer
mediante esta forma
*/
    const { termsAndConditions , ...newPerson} = this.myForm.value

    this.person= newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
    
  }

}
