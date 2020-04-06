import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfesorHomeComponent } from './profesor/profesor-home/profesor-home.component';
import { AlumnoHomeComponent } from './alumno/alumno-home/alumno-home.component';
import { CursoHomeComponent } from './curso/curso-home/curso-home.component';
import { PruebaHomeComponent } from './prueba/prueba-home/prueba-home.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
