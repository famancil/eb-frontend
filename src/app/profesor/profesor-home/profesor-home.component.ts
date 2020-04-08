import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../models/profesor/profesor.model';
import { ProfesorService } from '../../services/profesor/profesor.service';4
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import 'datatables.net';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.component.html',
  styleUrls: ['./profesor-home.component.css']
})
export class ProfesorHomeComponent implements OnInit {

  profesores: Profesor[];
  faPlus = faPlus;
  faEdit = faEdit;
  faTimes = faTimes;
  modalReference: any;
  profesor: Profesor;
  status: number;
  correoError = false;
  serverError = false;

  profesorNewForm = new FormGroup({
    nombre: new FormControl('',[
      Validators.required]),
      correo: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    });  

  profesorEditForm = new FormGroup({
    nombre: new FormControl('',[
      Validators.required]),
      correo: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    });  
  
  constructor(private profesorService : ProfesorService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getProfesores();
  }

  async getProfesores(){
    let result = await this.profesorService.getProfesores();
    this.profesores = result['profesores'];
    console.log(this.profesores);
    
    $(function(){
      $('#tabla_profesor').DataTable({
        responsive: true,
        language: {
          processing: "Procesando...",
          search: "Buscar:",
          lengthMenu: "Mostrar _MENU_ registros",
          info: "Mostrando desde _START_ al _END_ de _TOTAL_ registros",
          infoEmpty: "Mostrando ningún registros.",
          infoFiltered: "(filtrado _MAX_ registros total)",
          infoPostFix: "",
          loadingRecords: "Cargando registros...",
          zeroRecords: "No se encontraron registros",
          emptyTable: "No hay datos disponibles en la tabla",
          paginate: {
            first: "Primero",
            previous: "Anterior",
            next: "Siguiente",
            last: "Último"
          },
        }
      });
    });
  }

  open(content,id) {
    if(id>0) this.profesor = this.profesores.find(element => element.id === id);
    this.modalReference = this.modalService.open(content);
  }

  close(){
    this.correoError = false;
    this.serverError = false;
    this.modalReference.close();
  }

  get getNewNombre(){
    return this.profesorNewForm.get('nombre')
  }
  
  get getNewCorreo(){
    return this.profesorNewForm.get('correo')
  }

  get getEditNombre(){
    return this.profesorEditForm.get('nombre')
  }
  
  get getEditCorreo(){
    return this.profesorEditForm.get('correo')
  }

  async save(profesorData){
    try {
      await this.profesorService.save(profesorData);
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
