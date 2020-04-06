import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfesorHomeComponent } from './profesor/profesor-home/profesor-home.component';
import { AlumnoHomeComponent } from './alumno/alumno-home/alumno-home.component';
import { CursoHomeComponent } from './curso/curso-home/curso-home.component';
import { PruebaHomeComponent } from './prueba/prueba-home/prueba-home.component';

import { ProfesorService } from './services/profesor/profesor.service';

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
    PruebaHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    ProfesorService,
    {provide: 'BACKEND_API_URL', useValue: environment.backendApiUrl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
