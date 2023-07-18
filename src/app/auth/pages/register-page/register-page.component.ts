import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* import { cantBeStrider, firstNameAndLastnamePattern } from 'src/app/shared/validators/validators';
import { emailPattern } from '../../../shared/validators/validators'; */
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    /* La validacion debe tener 2 palabras */
    name: ['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    /* Aqui utilizamos el regex para validaciones de tipo email */
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern) ]],
    username:['', [Validators.required, this.validatorService.cantBeStrider]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  } ,
  /* Es otra forma para validar todo el formulario, pero en este caso se envia algo especifico y se consume el servicio de validators */
  {
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  constructor( 
    private fb: FormBuilder,
    private validatorService: ValidatorsService
    ){}

  isValidField(field: string){
    return this.validatorService.isValidField(this.myForm, field)
  }

  onSubmit(){
    this.myForm.markAllAsTouched()
  }
}
