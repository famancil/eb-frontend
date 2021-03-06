import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import 'datatables.net';
import { Curso } from 'src/app/models/curso/curso.model';
import { Alumno } from 'src/app/models/alumno/alumno.model';
import { CursoInscrito } from 'src/app/models/curso-inscrito/curso-inscrito.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CursoInscritoService } from 'src/app/services/curso-inscrito/curso-inscrito.service';
import { CursoService } from 'src/app/services/curso/curso.service';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { ActivatedRoute } from '@angular/router';
import { PruebaService } from 'src/app/services/prueba/prueba.service';
import { Prueba } from 'src/app/models/prueba/prueba.model';

@Component({
  selector: 'app-prueba-home',
  templateUrl: './prueba-home.component.html',
  styleUrls: ['./prueba-home.component.css']
})
export class PruebaHomeComponent implements OnInit {

  pruebas:Prueba[];
  prueba:Prueba;
  cursos:Curso[];
  curso:Curso;
  inscritos:Alumno[];
  alumnos:Alumno[];
  seleccionadoCurso = {};
  seleccionadoAlumno = {};
  faPlus = faPlus;
  faEdit = faEdit;
  faTimes = faTimes;
  modalReference: any;
  cursoInscrito: CursoInscrito;
  status: number;
  pruebaError = false;
  serverError = false;

  pruebaNewForm = new FormGroup({    
    nombre: new FormControl(null,[
      Validators.required]),
    nota: new FormControl(null,[
      Validators.required,
      Validators.pattern("[0-9]{1,3}")]),
    cursoId: new FormControl(null,[
      Validators.required]),
    alumnoId: new FormControl(null,[
      Validators.required])
  });

  pruebaEditForm = new FormGroup({    
    nombre: new FormControl(null,[
      Validators.required]),
    nota: new FormControl(null,[
      Validators.required]),
    cursoId: new FormControl(null,[
      Validators.required]),
    alumnoId: new FormControl(null,[
      Validators.required])
  });

  constructor(private pruebaService : PruebaService, 
    private cursoService : CursoService,
    private alumnoService : AlumnoService,
    private route : ActivatedRoute,
    private modalService: NgbModal) {}

  async ngOnInit() {
    await this.getPruebas();
    await this.getCursos();
    await this.getAlumnos();
  }

  async getPruebas(){
    let result = await this.pruebaService.getPruebas();
    this.pruebas = result['pruebas'];

    $(function(){
      $('#tabla_pruebas').DataTable({
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

  async getCursos(){
    let result = await this.cursoService.getCursos();
    this.cursos = result['cursos'];  
  }

  async getAlumnos(){
    let result = await this.alumnoService.getAlumnos();
    this.alumnos = result['alumnos'];  
  }

  open(content,id) {
    if(id>0) this.prueba = this.pruebas.find(element => element.id === id);
    this.modalReference = this.modalService.open(content);
  }

  close(){
    this.pruebaError = false;
    this.serverError = false;
    this.modalReference.close();
  }

  get getNewNombre(){
    return this.pruebaNewForm.get('nombre')
  }

  get getNewNota(){
    return this.pruebaNewForm.get('nota')
  }

  get getEditNombre(){
    return this.pruebaEditForm.get('nombre')
  }

  get getEditNota(){
    return this.pruebaEditForm.get('nota')
  }

  async save(pruebaData){
    try {
      await this.pruebaService.save(pruebaData);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 422 || status === 400)
        this.pruebaError = true;
      if(status === 500)
        this.serverError = true;
    }    
  }

  async update(pruebaData,id){
    try {
      await this.pruebaService.update(pruebaData,id);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 422 || status === 400)
        this.pruebaError = true;
      if(status === 500)
        this.serverError = true;
    }    
  }

  async deletePrueba(id){
    try {
      await this.pruebaService.deletePrueba(id);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 500)
        this.serverError = true;
    }    
  }

}
