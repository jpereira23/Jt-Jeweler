import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { SignUpComponent } from './signup/signup.component'; 
import { SignInComponent } from './signin/signin.component';
import { EditJewelryComponent } from './editJewel/editjewel.component';
import { AddJewelryComponent } from './addJewel/addjewel.component';
import { ViewJewelryComponent } from './viewJewel/viewjewel.component';
import { ManageAccountComponent } from './manageAccount/manageaccount.component';
import { ProductPageComponent } from './productPage/productpage.component';
import { CategoryComponent } from './category/category.component';
import { ShoppingCartComponent } from './shoppingCart/shoppingcart.component';
const appRoutes: Routes = [ 
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  }, 
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'addJewel',
    component: AddJewelryComponent
  },
  {
    path: 'viewJewel',
    component: ViewJewelryComponent
  },
  {
    path: 'editJewel',
    component: EditJewelryComponent
  },
  {
    path: 'manageAccount',
    component: ManageAccountComponent
  },
  {
    path: 'productPage',
    component: ProductPageComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'shoppingCart',
    component: ShoppingCartComponent
  },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
