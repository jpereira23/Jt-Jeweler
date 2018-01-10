import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadModule } from "angular2-image-upload";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { SignUpComponent } from './signup/signup.component'; 
import { SignInComponent } from './signin/signin.component';
import { AddJewelryComponent } from './addJewel/addjewel.component';
import { EditJewelryComponent } from './editJewel/editjewel.component';
import { ViewJewelryComponent } from './viewJewel/viewjewel.component';


// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { AuthenticationService } from './authentication.service';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    AdminComponent,
    SignUpComponent,
    SignInComponent,
    AddJewelryComponent,
    EditJewelryComponent,
    ViewJewelryComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot()
  ],
  providers: [DataService,
  AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
