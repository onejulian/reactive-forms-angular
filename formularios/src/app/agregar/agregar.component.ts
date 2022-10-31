import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Usuario{
  nombre: string;
  correo: string;
  password: string;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  formularioCreado!: FormGroup
  esNuevo: boolean = true;
  usuarios: Usuario[] = []
  posicionEditar: number = -1;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario()
  }

  crearFormulario()
  {
    this.formularioCreado = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      contrasenia: ['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])]
    })
  }

  agregarUsuario()
  {
    const usuario: Usuario = {
      nombre: this.formularioCreado.value.nombre,
      correo: this.formularioCreado.value.correo,
      password: this.formularioCreado.value.contrasenia
    }
    this.usuarios.push(usuario)
    // console.log(this.formularioCreado.value)
    this.formularioCreado.reset()
  }

  editar()
  {
    this.usuarios[this.posicionEditar].nombre = this.formularioCreado.value.nombre
    this.usuarios[this.posicionEditar].correo = this.formularioCreado.value.correo
    this.usuarios[this.posicionEditar].password = this.formularioCreado.value.contrasenia
    this.formularioCreado.reset()
    this.esNuevo = true
    this.posicionEditar = -1
  }

  editarUsuario(posicion: number)
  {
    this.formularioCreado.setValue({
      nombre: this.usuarios[posicion].nombre,
      correo: this.usuarios[posicion].correo,
      contrasenia: this.usuarios[posicion].password
    })
    this.posicionEditar = posicion
    this.esNuevo = false;
  }

  eliminarUsuario(posicion: number)
  {
    this.usuarios.splice(posicion, 1)
  }

}
