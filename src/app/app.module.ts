import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfesorHomeComponent } from './profesor/profesor-home/profesor-home.component';
import { AlumnoHomeComponent } from './alumno/alumno-home/alumno-home.component';
import { CursoHomeComponent } from './curso/curso-home/curso-home.component';
import { PruebaHomeComponent } from './prueba/prueba-home/prueba-home.component';
import { CursoInscritoHomeComponent } from './curso-inscrito/curso-inscrito-home/curso-inscrito-home.component';

import { ProfesorService } from './services/profesor/profesor.service';
import { AlumnoService } from './services/alumno/alumno.service';
import { CursoService } from './services/curso/curso.service';
import { CursoInscritoService } from './services/curso-inscrito/curso-inscrito.service';
import { PruebaService } from './services/prueba/prueba.service';

import{ environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProfesorHomeComponent,
    AlumnoHomeComponent,
    CursoHomeComponent,
    PruebaHomeComponent,
    CursoInscritoHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    ProfesorService,
    AlumnoService,
    CursoService,
    CursoInscritoService,
    PruebaService,
    {provide: 'BACKEND_API_URL', useValue: environment.backendApiUrl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
