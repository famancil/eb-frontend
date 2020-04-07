import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../models/profesor/profesor.model';
import { ProfesorService } from '../../services/profesor/profesor.service';4
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import 'datatables.net';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.component.html',
  styleUrls: ['./profesor-home.component.css']
})
export class ProfesorHomeComponent implements OnInit {

  profesores: Profesor[];
  faEdit = faEdit;
  faTimes = faTimes;
  modalReference: any;
  profesor: Profesor;
  status: number;
  correoError = false;
  serverError = false;

  profesorForm = new FormGroup({
    nombre: new FormControl('',[
      Validators.required]),
      correo: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    });  
  
  constructor(private profesorService : ProfesorService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getFirstProfesores();
  }

  async getFirstProfesores(){
    let result = await this.profesorService.getFirstProfesores();
    this.profesores = result['profesores'];
    console.log(this.profesores);
    
    $(function(){
      $('#tabla_profesor').DataTable({
        responsive: true
      });
    });
  }

  open(content,id) {
    this.profesor = this.profesores.find(element => element.id === id);
    this.modalReference = this.modalService.open(content);
  }

  close(){
    this.serverError = false;
    this.modalReference.close();
  }

  get getNombre(){
    return this.profesorForm.get('nombre')
    }
  
  get getCorreo(){
  return this.profesorForm.get('correo')
  }

  async update(profesorData,id){
    try {
      await this.profesorService.update(profesorData,id);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 422 || status === 400)
        this.correoError = true;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }

  async deleteProf(id){
    try {
      await this.profesorService.deleteProf(id);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }


}
