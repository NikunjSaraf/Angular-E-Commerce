import { Component, Input } from '@angular/core';
import { Product } from '../models/products';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product:Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService:ShoppingCartService) { }

 addToCart(){
   this.cartService.addToCart(this.product); 
  }

  getQuantity() {
    if (!this.shoppingCart) { return 0; }
    // console.log(this.shoppingCart);
    const item = this.shoppingCart.itemsMap[this.product.key];
    return item ? item.quantity : 0;
  }

}
