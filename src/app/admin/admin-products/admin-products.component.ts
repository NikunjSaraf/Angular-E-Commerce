import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription, from } from 'rxjs';
import { Product } from 'src/app/models/products';
import {Sort, MatSort} from '@angular/material/sort';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  product:Product[]=[];
  products:any[]=[];
  subscription:Subscription;
  filteredProducts:any[]=[];
  sortedData:Product[];
  datasource=new MatTableDataSource(this.filteredProducts);
  @ViewChild(MatPaginator,{static:false}) paginator:MatPaginator;
  @ViewChild(MatSort,{static:false}) sort:MatSort;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(products => {this.filteredProducts=this.products=products
              });
    }

  ngOnInit() {
    this.datasource.sort=this.sort;
    this.datasource.paginator=this.paginator;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();

  }

  filter(query:string){
    this.filteredProducts=(query)?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):this.products;
  }
}
 

