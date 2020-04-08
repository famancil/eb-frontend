import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Profesor } from 'src/app/models/profesor/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private apiUrl = environment.backendApiUrl;

  constructor(private http: HttpClient) { }

  /* Obtener todos los profesores */
  getProfesores(){
    return this.http.get<Profesor[]>(this.apiUrl+'profesores').toPromise();    
  }

  /* Guardar un profesor en el servidor */
  save(profesor: Profesor){
    return this.http.post(this.apiUrl+'profesores/',profesor).toPromise(); 
  }

  /* Actualizar un profesor en el servidor */
  update(profesor: Profesor, id: number){
    return this.http.put(this.apiUrl+'profesores/'+id,profesor).toPromise(); 
  }

  /* Borrar un profesor en el servidor */
  deleteProf(id: number){
    return this.http.delete(this.apiUrl+'profesores/'+id).toPromise(); 
  }
}
