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

  getAlumnos(){
    return this.http.get<Alumno[]>(this.apiUrl+'alumnos').toPromise();    
  }

  save(alumno: any){
    return this.http.post(this.apiUrl+'alumnos/',alumno).toPromise(); 
  }

  update(alumno: any, id: number){
    return this.http.put(this.apiUrl+'alumnos/'+id,alumno).toPromise(); 
  }

  deleteAlumno(id: number){
    return this.http.delete(this.apiUrl+'alumnos/'+id).toPromise(); 
  }
}
