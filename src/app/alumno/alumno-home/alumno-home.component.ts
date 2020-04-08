import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno/alumno.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import 'datatables.net';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Alumno } from 'src/app/models/alumno/alumno.model';

@Component({
  selector: 'app-alumno-home',
  templateUrl: './alumno-home.component.html',
  styleUrls: ['./alumno-home.component.css']
})
export class AlumnoHomeComponent implements OnInit {

  alumnos: Alumno[];
  faPlus = faPlus;
  faEdit = faEdit;
  faTimes = faTimes;
  modalReference: any;
  alumno: Alumno;
  status: number;
  correoError = false;
  serverError = false;

  alumnoNewForm = new FormGroup({
    nombre: new FormControl('',[
      Validators.required]),
      correo: new FormControl('',[
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    });  

  alumnoEditForm = new FormGroup({
    nombre: new FormControl('',[
      Validators.required]),
      correo: new FormControl('',[
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    });  
  
  constructor(private alumnoService : AlumnoService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAlumnos();
  }

  async getAlumnos(){
    let result = await this.alumnoService.getAlumnos();
    this.alumnos = result['alumnos'];
    console.log(this.alumnos);
    
    $(function(){
      $('#tabla_alumnos').DataTable({
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
    if(id>0) this.alumno = this.alumnos.find(element => element.id === id);
    this.modalReference = this.modalService.open(content);
  }

  close(){
    this.correoError = false;
    this.serverError = false;
    this.modalReference.close();
  }

  get getNewNombre(){
    return this.alumnoNewForm.get('nombre')
  }
  
  get getNewCorreo(){
    return this.alumnoNewForm.get('correo')
  }

  get getEditNombre(){
    return this.alumnoEditForm.get('nombre')
  }
  
  get getEditCorreo(){
    return this.alumnoEditForm.get('correo')
  }

  async save(alumnoData){
    let _alumnoData = {}
    if(alumnoData.correo === "") _alumnoData['nombre'] = alumnoData.nombre;
    else _alumnoData = alumnoData;
    try {
      await this.alumnoService.save(_alumnoData);
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

  async update(alumnoData,id){
    try {
      await this.alumnoService.update(alumnoData,id);
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

  async deleteAlumno(id){
    try {
      await this.alumnoService.deleteAlumno(id);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }

}
