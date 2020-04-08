import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Prueba } from 'src/app/models/prueba/prueba.model';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private apiUrl = environment.backendApiUrl;

  constructor(private http: HttpClient) { }

  /* Obtener todas las pruebas */
  getPruebas(){
    return this.http.get<any[]>(this.apiUrl+'pruebas').toPromise();    
  }

  /* Guardar una prueba en el servidor */
  save(prueba: Prueba){
    return this.http.post(this.apiUrl+'pruebas/',prueba).toPromise(); 
  }

  /* Actualizar una prueba en el servidor */
  update(prueba: Prueba, id: number){
    return this.http.put(this.apiUrl+'pruebas/'+id,prueba).toPromise(); 
  }

  /* Borrar una prueba en el servidor */
  deletePrueba(id: number){
    return this.http.delete(this.apiUrl+'pruebas/'+id).toPromise(); 
  }
}
