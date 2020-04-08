import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import 'datatables.net';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CursoInscrito } from 'src/app/models/curso-inscrito/curso-inscrito.model';
import { Curso } from 'src/app/models/curso/curso.model';
import { Alumno } from 'src/app/models/alumno/alumno.model';
import { CursoInscritoService } from 'src/app/services/curso-inscrito/curso-inscrito.service';
import { CursoService } from 'src/app/services/curso/curso.service';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-curso-inscrito-home',
  templateUrl: './curso-inscrito-home.component.html',
  styleUrls: ['./curso-inscrito-home.component.css']
})
export class CursoInscritoHomeComponent implements OnInit {

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
  inscritoError = false;
  serverError = false;

  cursoInscritoNewForm = new FormGroup({    
    cursoId: new FormControl(null,[
      Validators.required]),
    alumnoId: new FormControl(null,[
      Validators.required])
  });

  cursoInscritoEditForm = new FormGroup({    
    cursoId: new FormControl(null,[
      Validators.required]),
    alumnoId: new FormControl(null,[
      Validators.required])
  });

  constructor(private cursoInscritoService : CursoInscritoService, 
    private cursoService : CursoService,
    private alumnoService : AlumnoService,
    private route : ActivatedRoute,
    private modalService: NgbModal) {}

  async ngOnInit() {

    let cursoId = this.route.snapshot.paramMap.get("cursoId");
    await this.getCursoInscrito(cursoId);
    await this.getCurso(cursoId);
    await this.getCursos();
    await this.getInscritos();
    await this.getAlumnos();
  }

  async getCursoInscrito(cursoId: string){
    let result = await this.cursoInscritoService.getCursoInscritoByCurso(cursoId);
    this.cursoInscrito = result['cursoInscrito'];

    $(function(){
      $('#tabla_inscritos').DataTable({
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

  async getCurso(id:string){
    let result = await this.cursoService.getCurso(id);
    this.curso = result['curso'];  
  }

  async getInscritos(){
    this.inscritos = this.curso['inscritos'];  
    console.log(this.inscritos)
  }

  async getAlumnos(){
    let result = await this.alumnoService.getAlumnos();
    this.alumnos = result['alumnos'];  
  }

  async open(content,cursoId,alumnoId) {
    console.log(alumnoId)
    if(cursoId>0 && alumnoId>0){
      let result = await this.cursoInscritoService.getCursoInscritoByCursoAndAlumno(cursoId,alumnoId);
      this.cursoInscrito =  result['cursoInscrito'];  
    } 
    this.modalReference = this.modalService.open(content);
  }

  close(){
    this.inscritoError = false;
    this.serverError = false;
    this.modalReference.close();
  }

  async save(cursoInscritoData){
    /*let _cursoData = {}
    if(cursoData.descripcion === "") _alumnoData['nombre'] = alumnoData.nombre;
    else _alumnoData = alumnoData;*/
    try {
      await this.cursoInscritoService.save(cursoInscritoData);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 422 || status === 400)
        this.inscritoError = true;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }

  async update(cursoInscritoData,cursoId,alumnoId){
    try {
      let result = await this.cursoInscritoService.getCursoInscritoByCursoAndAlumno(cursoId,alumnoId);
      this.cursoInscrito =  result['cursoInscrito'];
      await this.cursoInscritoService.update(cursoInscritoData,this.cursoInscrito.id);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 422 || status === 400)
      this.inscritoError = true;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }

  async deleteInscrito(cursoId,alumnoId){
    try {
      let result = await this.cursoInscritoService.getCursoInscritoByCursoAndAlumno(cursoId,alumnoId);
      this.cursoInscrito =  result['cursoInscrito'];
      await this.cursoInscritoService.deleteCursoInscrito(this.cursoInscrito.id);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }

}
