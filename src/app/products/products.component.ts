import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/products';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  products:Product[]=[];
  filteredProduct:Product[]=[];
  category:string;
  cart:any;
  subscription:Subscription;
  constructor(
      private route: ActivatedRoute,
      private productService: ProductService,
     private shoppingCartService:ShoppingCartService 
      ) {
        // productService.getAll()
        // .pipe(switchMap( products => {
        //   let temp: any[];
        //   temp = products;
        //   this.products = temp; 
        //   return route.queryParamMap;
        //   }))
        //   .subscribe(params => {
        //     this.category = params.get('category');
      
        //   this.filteredProduct = (this.category) ?
        //     this.products.filter(p => p.category === this.category) : 
        //     this.products;
        // });
    }
  

    async ngOnInit() {
      this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => {
        let temp: any;
        return temp = cart.payload.child('/items').val();
        //this.cart = new ShoppingCart(temp);
        // this.cart = temp;
        // console.log(this.cart);
      });
  
    this.productService.getAll()
    .pipe(switchMap( products => {
      let temp: any[];
      temp = products;
      this.products = temp; 
      return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProduct = (this.category) ?
          this.products.filter(p => p.category === this.category) : 
          this.products;
      }); 
    }
  
  filter(query:string){
    this.filteredProduct=(query)?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}