import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import 'datatables.net';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/curso/curso.model';
import { CursoService } from 'src/app/services/curso/curso.service';
import { Profesor } from 'src/app/models/profesor/profesor.model';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';

@Component({
  selector: 'app-curso-home',
  templateUrl: './curso-home.component.html',
  styleUrls: ['./curso-home.component.css']
})
export class CursoHomeComponent implements OnInit {

  cursos: Curso[];
  profesores:Profesor[];
  seleccionado = {};
  faEye = faEye;
  faPlus = faPlus;
  faEdit = faEdit;
  faTimes = faTimes;
  modalReference: any;
  curso: Curso;
  status: number;
  semestreError = false;
  serverError = false;

  cursoNewForm = new FormGroup({
    nombre: new FormControl('',[
      Validators.required]),
    descripcion: new FormControl(null),
    semestre: new FormControl('',[
      Validators.required,
      Validators.pattern("[0-9]{4}\-[0-9]")]),
    profesorId: new FormControl(null,[
      Validators.required])
  });  

  cursoEditForm = new FormGroup({
    nombre: new FormControl('',[
      Validators.required]),
    descripcion: new FormControl(null),
    semestre: new FormControl('',[
      Validators.required,
      Validators.pattern("[0-9]{4}\-[0-9]")]),
    profesorId: new FormControl(null,[
      Validators.required])
  }); 
  
  constructor(private cursoService : CursoService, private profesorService : ProfesorService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getCursos();
    this.getProfesores();
  }

  async getCursos(){
    let result = await this.cursoService.getCursos();
    this.cursos = result['cursos'];
    console.log(this.cursos);
    
    $(function(){
      $('#tabla_cursos').DataTable({
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

  async getProfesores(){
    let result = await this.profesorService.getProfesores();
    this.profesores = result['profesores'];  
  }

  open(content,id) {
    if(id>0) this.curso = this.cursos.find(element => element.id === id);
    this.modalReference = this.modalService.open(content);
  }

  close(){
    this.semestreError = false;
    this.serverError = false;
    this.modalReference.close();
  }

  get getNewNombre(){
    return this.cursoNewForm.get('nombre')
  }

  get getNewDescripcion(){
    return this.cursoNewForm.get('descripcion')
  }
  
  get getNewSemestre(){
    return this.cursoNewForm.get('semestre')
  }

  get getEditNombre(){
    return this.cursoEditForm.get('nombre')
  }

  get getEditDescripcion(){
    return this.cursoEditForm.get('descripcion')
  }
  
  get getEditSemestre(){
    return this.cursoEditForm.get('semestre')
  }

  async save(cursoData){
    /*let _cursoData = {}
    if(cursoData.descripcion === "") _alumnoData['nombre'] = alumnoData.nombre;
    else _alumnoData = alumnoData;*/
    try {
      await this.cursoService.save(cursoData);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 422 || status === 400)
        this.semestreError = true;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }

  async update(cursoData,id){
    try {
      await this.cursoService.update(cursoData,id);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 422 || status === 400)
        this.semestreError = true;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }

  async deleteCurso(id){
    try {
      await this.cursoService.deleteCurso(id);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }

}
