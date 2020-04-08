import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Curso } from 'src/app/models/curso/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiUrl = environment.backendApiUrl;

  constructor(private http: HttpClient) { }

  getCursos(){
    return this.http.get<any[]>(this.apiUrl+'cursos').toPromise();    
  }

  getCurso(id:string){
    return this.http.get<any>(this.apiUrl+'cursos/'+id).toPromise();    
  }

  save(curso: Curso){
    return this.http.post(this.apiUrl+'cursos/',curso).toPromise(); 
  }

  update(curso: Curso, id: number){
    return this.http.put(this.apiUrl+'cursos/'+id,curso).toPromise(); 
  }

  deleteCurso(id: number){
    return this.http.delete(this.apiUrl+'cursos/'+id).toPromise(); 
  }
}
