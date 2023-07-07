import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/* Este es un ejemplo de valor por defecto que se traeria de un back para establecer en this.myForm.reset(rtx5090)
solo es un ejemplo */
const rtx5090 ={
  name: 'rtx5090',
  price: 4500,
  inStorage: 4,
 } 

@Component({
  templateUrl: './basic-page.component.html',
  styles: [],
})


export class BasicPageComponent implements OnInit {
  /* Importante importar en los modulos ReactiveFormsModule */
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // })

  /* Otra forma de hacerlo para no estar pegando new FormControl es injectando un servicio como Form Builder */



  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    /* Ejemplo para establecer valor por defecto traido de un back */
/*     this.myForm.reset(rtx5090) */
  }

  /* Validacion para mostrar error de requerido ocn la condicion si ha sido manipulado */
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

/* En el segundo campo del arreglo de cada propiedad se pueden incluir validaciones o un arreglo de validaciones segun como se requiera */
  public myForm: FormGroup = this.fb.group({
    /* Validacion requerida y debe contener como minimo 3 letras */
    name: ['', [Validators.required, Validators.minLength(3)]],
    /* Validacion requerida y no puede ser menor a 0 ya que es el valor minimo */
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  onSave():void{
    /* El if si el el formulario no es valido no me permite pasar al console.log() o realizar lo que se necesite despues de las validaciones */
    if(!this.myForm.valid){
      /* Esta sentencia es porque cuando se salta una primer vez la validacion de campo es requerido a la segunda vez 
      no lo marca y se hace necesario poner esta sentencia para que vuelva y salte la validacion */
      this.myForm.markAllAsTouched();
      return
    } 
    console.log(this.myForm.value);
    /* Ayuda a reestablecer los valores iniciales del formulario pero los deja vacios si se deja de esta forma*/
    /* this.myForm.reset() */
    /* pero si se establecen los valores de las propiedades podemos resetear el formulario a gusto */
    this.myForm.reset({
      name: ' ',
      price: 0,
      inStorage: 0,
    })
  }
}
