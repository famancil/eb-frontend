import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Profesor } from 'src/app/models/profesor/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private apiUrl = environment.backendApiUrl;

  constructor(private http: HttpClient) { }

  getFirstProfesores(){
    return this.http.get<Profesor[]>(this.apiUrl+'profesores').toPromise();    
  }
}