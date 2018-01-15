import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { SignUpComponent } from './signup/signup.component'; 
import { SignInComponent } from './signin/signin.component';
import { AddJewelryComponent } from './addJewel/addjewel.component';
import { EditJewelryComponent } from './editJewel/editjewel.component';
import { ViewJewelryComponent } from './viewJewel/viewjewel.component';
import { ManageAccountComponent } from './manageAccount/manageaccount.component';
import { HeaderComponent } from './layout/header.component';
import { AdminHeaderComponent } from './layout/adminHeader.component';
import { ProductPageComponent } from './productPage/productpage.component';
import { CategoryComponent } from './category/category.component';
import { ShoppingCartComponent } from './shoppingCart/shoppingcart.component';
import { ContactUsComponent } from './contactUs/contactus.component';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { AuthenticationService } from './authentication.service';
import { CartService } from './cart.service';
import { WishListService } from './wishlist.service';

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
    ManageAccountComponent,
    HeaderComponent,
    AdminHeaderComponent,
    ProductPageComponent,
    CategoryComponent,
    ShoppingCartComponent, 
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  providers: [DataService,
  AuthenticationService,
  CartService,
  WishListService], // <-Add DataService  
  bootstrap: [AppComponent]
})
export class AppModule { }
