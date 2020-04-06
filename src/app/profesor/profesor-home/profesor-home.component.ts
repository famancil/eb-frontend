import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../models/profesor/profesor.model';
import { ProfesorService } from '../../services/profesor/profesor.service';

@Component({
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.component.html',
  styleUrls: ['./profesor-home.component.css']
})
export class ProfesorHomeComponent implements OnInit {

  profesores: Profesor[];
  
  constructor(private profesorService : ProfesorService) { }

  ngOnInit(): void {
    this.getFirstProfesores();
  }

  async getFirstProfesores(){
    let result = await this.profesorService.getFirstProfesores();
    this.profesores = result['profesores'];
    console.log(this.profesores);
  }

}
