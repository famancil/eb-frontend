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

  getProfesores(){
    return this.http.get<Profesor[]>(this.apiUrl+'profesores').toPromise();    
  }

  save(profesor: Profesor){
    return this.http.post(this.apiUrl+'profesores/',profesor).toPromise(); 
  }

  update(profesor: Profesor, id: number){
    return this.http.put(this.apiUrl+'profesores/'+id,profesor).toPromise(); 
  }

  deleteProf(id: number){
    return this.http.delete(this.apiUrl+'profesores/'+id).toPromise(); 
  }
}
