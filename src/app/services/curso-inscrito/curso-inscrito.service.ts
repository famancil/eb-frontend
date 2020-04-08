import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CursoInscrito } from 'src/app/models/curso-inscrito/curso-inscrito.model';

@Injectable({
  providedIn: 'root'
})
export class CursoInscritoService {

  private apiUrl = environment.backendApiUrl;

  constructor(private http: HttpClient) { }

  getCursoInscritos(){
    return this.http.get<any[]>(this.apiUrl+'cursoInscritos').toPromise();    
  }

  getCursoInscritoByCurso(id: string){
    return this.http.get<any[]>(this.apiUrl+'cursoInscritos/cursos/'+id).toPromise();    
  }

  getCursoInscritoByCursoAndAlumno(cursoId: number, alumnoId:number){
    return this.http.get<any[]>(this.apiUrl+'cursoInscritos/cursos/'+cursoId+'/alumnos/'+alumnoId).toPromise();    
  }

  save(cursoInscrito: CursoInscrito){
    return this.http.post(this.apiUrl+'cursoInscritos/',cursoInscrito).toPromise(); 
  }

  update(cursoInscrito: CursoInscrito, id: number){
    return this.http.put(this.apiUrl+'cursoInscritos/'+id,cursoInscrito).toPromise(); 
  }

  deleteCursoInscrito(id: number){
    return this.http.delete(this.apiUrl+'cursoInscritos/'+id).toPromise(); 
  }
}
