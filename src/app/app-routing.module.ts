import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfesorHomeComponent } from './profesor/profesor-home/profesor-home.component';
import { AlumnoHomeComponent } from './alumno/alumno-home/alumno-home.component';
import { CursoHomeComponent } from './curso/curso-home/curso-home.component';
import { CursoInscritoHomeComponent } from './curso-inscrito/curso-inscrito-home/curso-inscrito-home.component';
import { PruebaHomeComponent } from './prueba/prueba-home/prueba-home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profesores', component: ProfesorHomeComponent},
  {path: 'alumnos', component: AlumnoHomeComponent},
  {path: 'cursos', component: CursoHomeComponent},
  {path: 'cursoInscritos/:cursoId', component: CursoInscritoHomeComponent},
  {path: 'pruebas', component: PruebaHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
