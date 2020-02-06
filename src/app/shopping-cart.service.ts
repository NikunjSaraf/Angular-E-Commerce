import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/products';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-cart').push({
      dateCreated:new Date().getTime()
    }); 
  }

  
  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges();
  }


  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }


  private async getOrCreateCartId():Promise<string>{
    let cartId=localStorage.getItem('cartId');
    if(cartId) return cartId;

      let result=await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key;
  }

   addToCart(product:Product){
   this.updateItemQuantity(product,1);
   }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);

    item.snapshotChanges().pipe(take(1))
    .subscribe(data => {
      const quantity = (data.payload.child('/quantity').val() || 0) + change ;
      if (quantity === 0) { 
        item.remove(); 
      } else {
        item.update({product: product, 
          quantity: quantity});
      }
      
    });
  }






}
