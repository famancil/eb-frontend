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

  getPruebas(){
    return this.http.get<any[]>(this.apiUrl+'pruebas').toPromise();    
  }

  save(prueba: Prueba){
    return this.http.post(this.apiUrl+'pruebas/',prueba).toPromise(); 
  }

  update(prueba: Prueba, id: number){
    return this.http.put(this.apiUrl+'pruebas/'+id,prueba).toPromise(); 
  }

  deletePrueba(id: number){
    return this.http.delete(this.apiUrl+'pruebas/'+id).toPromise(); 
  }
}
