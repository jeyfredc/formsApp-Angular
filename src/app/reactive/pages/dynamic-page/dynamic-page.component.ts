import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

    public myForm: FormGroup= this.fb.group({
      name:['', [Validators.required, Validators.minLength(3)]],
      favoriteGames: this.fb.array([
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required],
      ])
    })
  /* Este formControl se va a agregar a la parte de agregar favoritos y se hace para ir mandando elementos al arreglo */
  public newFavorite: FormControl = new FormControl('', Validators.required)

  constructor(
    private fb:FormBuilder){}

    /* Como es un arreglo se crea un getter de esta forma para poder llamarlo en el formArray de de favoriteGames
    y luego poder iterarlo, realmente lo que se va a iterar es este getter */
    get favoriteGames(){
      return this.myForm.get('favoriteGames') as FormArray
    }

      /* Validacion para mostrar error de requerido ocn la condicion si ha sido manipulado */
  isValidField(field:string){
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }
/* Esta validacion es solo para arreglos */
  isValidFieldInArray(formArray:FormArray, index:number){
    return formArray.controls[index].errors
    && formArray.controls[index].touched
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

  onAddToFavorites():void{
    if(this.newFavorite.invalid)return

    const newGame = this.newFavorite.value
/* Esta es la forma de insertar al array mediante un grupo de control */
    this.favoriteGames.push(this.fb.control(newGame, Validators.required))

    this.newFavorite.reset()
  }

onDeleteFavorite(index:number):void{
  this.favoriteGames.removeAt(index)
}

    onSubmit():void{
      if(this.myForm.invalid){
        this.myForm.markAllAsTouched()
        return
      }
      console.log(this.myForm.value);
      (this.myForm.controls['favoriteFGames'] as FormArray)  = this.fb.array([])
      this.myForm.reset()
    }
}
