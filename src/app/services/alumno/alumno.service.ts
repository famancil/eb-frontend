import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Alumno } from 'src/app/models/alumno/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private apiUrl = environment.backendApiUrl;

  constructor(private http: HttpClient) { }

  /* Obtener todos los alumnos */
  getAlumnos(){
    return this.http.get<Alumno[]>(this.apiUrl+'alumnos').toPromise();    
  }

  /* Guardar un alumno en servidor */
  save(alumno: any){
    return this.http.post(this.apiUrl+'alumnos/',alumno).toPromise(); 
  }

  /* Actualizar un alumno en servidor */
  update(alumno: any, id: number){
    return this.http.put(this.apiUrl+'alumnos/'+id,alumno).toPromise(); 
  }

  /* Borrar un alumno en servidor */
  deleteAlumno(id: number){
    return this.http.delete(this.apiUrl+'alumnos/'+id).toPromise(); 
  }
}
