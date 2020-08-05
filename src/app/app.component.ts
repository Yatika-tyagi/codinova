import { Component, OnInit } from '@angular/core';
import { posService } from './pos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Codinova';
  $prodcutListing;
  category = [];
  updatingCategory: [];
  selectedProductList: [] = [];
  selectedProduct: any = {};
  activeCategory: String = '';

  constructor(private posService: posService) {

  }

  ngOnInit() {
    this.$prodcutListing = this.posService.getProducts();
    return this.$prodcutListing.subscribe(a => {
      a.forEach(element => {
        this.category.includes(element.category) ? '' : this.category.push(element.category) ;
      });
      this.selectCategory(this.category[0]);
    });
  }


  selectCategory(category) {
    this.activeCategory = category;
    this.$prodcutListing.subscribe(
      a => {
        this.updatingCategory = a.filter(b => b.category === this.activeCategory);
      }
    );
  }

  selectProduct(productId){
    this.$prodcutListing.subscribe(
      a => {
        if(!this.selectedProduct.hasOwnProperty(productId)) {
          this.selectedProduct[productId] = a.filter(b => b.id === productId)[0];
        }
        this.selectedProductList = [...Object.values(this.selectedProduct)];
      }
    )
  }

  get subTotal() {
    return this.selectedProductList.reduce((total, value)=>{
      total = total + value.price;
      return total;
    }, 0);
  }

  get totalItem() {
    return this.selectedProductList.reduce((total, value)=>{
      total = total + value.quantity;
      return total;
    }, 0);
  }

  reset() {
    this.selectedProductList = [];
    this.selectedProduct = {};
  }


}
