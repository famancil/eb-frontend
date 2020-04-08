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

  /* Obtener todos los cursos */
  getCursos(){
    return this.http.get<any[]>(this.apiUrl+'cursos').toPromise();    
  }

  /* Obtener un curso por ID */
  getCurso(id:string){
    return this.http.get<any>(this.apiUrl+'cursos/'+id).toPromise();    
  }

  /* Guardar un curso en servidor */
  save(curso: Curso){
    return this.http.post(this.apiUrl+'cursos/',curso).toPromise(); 
  }

  /* Actualizar un curso en servidor */
  update(curso: Curso, id: number){
    return this.http.put(this.apiUrl+'cursos/'+id,curso).toPromise(); 
  }

  /* Borrar un curso en servidor */
  deleteCurso(id: number){
    return this.http.delete(this.apiUrl+'cursos/'+id).toPromise(); 
  }
}
