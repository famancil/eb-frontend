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

  /* Obtener todos los inscritos de todos los cursos */
  getCursoInscritos(){
    return this.http.get<any[]>(this.apiUrl+'cursoInscritos').toPromise();    
  }

  /* Obtener el registro de un inscrito (por curso) */
  getCursoInscritoByCurso(id: string){
    return this.http.get<any[]>(this.apiUrl+'cursoInscritos/cursos/'+id).toPromise();    
  }

  /* Obtener el registro de un inscrito (por curso y alumno) */
  getCursoInscritoByCursoAndAlumno(cursoId: number, alumnoId:number){
    return this.http.get<any[]>(this.apiUrl+'cursoInscritos/cursos/'+cursoId+'/alumnos/'+alumnoId).toPromise();    
  }

  /* Guardar un inscrito en el curso */
  save(cursoInscrito: CursoInscrito){
    return this.http.post(this.apiUrl+'cursoInscritos/',cursoInscrito).toPromise(); 
  }

  /* Actualizar un inscrito en el curso */
  update(cursoInscrito: CursoInscrito, id: number){
    return this.http.put(this.apiUrl+'cursoInscritos/'+id,cursoInscrito).toPromise(); 
  }

  /* Borrar un inscrito en el curso */
  deleteCursoInscrito(id: number){
    return this.http.delete(this.apiUrl+'cursoInscritos/'+id).toPromise(); 
  }
}
