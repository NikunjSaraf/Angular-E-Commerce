import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'

import { BsNavComponent } from './bs-nav/bs-nav.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatTableModule } from '@angular/material';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';


@NgModule({
  declarations: [
    AppComponent,
    BsNavComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    RouterModule.forRoot([
      { path:'',component:ProductsComponent},
      { path:'products',component:ProductsComponent},
      { path:'shopping-cart',component:ShoppingCartComponent},
      { path:'check-out',component:CheckOutComponent,canActivate:[AuthGuardService] },
      { path:'order-success',component:OrderSuccessComponent,canActivate:[AuthGuardService]},
      { path:'login',component:LoginComponent},
      { path:'my-orders',component:MyOrdersComponent,canActivate:[AuthGuardService]},
      
      { 
        path:'admin/products/new',
        component:ProductFormComponent ,
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      { 
        path:'admin/products/:key',
        component:ProductFormComponent ,
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
       { 
        path:'admin/products',
        component:AdminProductsComponent ,
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      { 
        path:'admin/orders',
        component:AdminOrdersComponent,
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },      
    ]),
    BrowserAnimationsModule,
    
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
