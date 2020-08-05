import { Component, OnInit } from '@angular/core';
import { posService } from './../pos.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'Codinova';
  $prodcutListing;
  category = [];
  updatingCategory: any = [];
  selectedProductList: any = [];
  selectedProduct: any = {};
  activeCategory: String = '';
  cart = {
    tax: 0,
    discount: 0
  };
  successCart:any =  {};

  constructor(public posService: posService) {

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
          this.selectedProduct[productId] = a.filter(b => b._id === productId)[0];
        }
        this.selectedProductList = [...Object.values(this.selectedProduct)];
      }
    )
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
  remove(id) {
    delete this.selectedProduct[id];
    this.selectedProductList = [...Object.values(this.selectedProduct)];
  }

  addToCart() {
    const dataList = [];
    this.selectedProductList.forEach(element => {
      dataList.push({
        ...this.cart,
        productId: element._id,
        userId: 'yatika@gmail.com',
        price: element.price,
        quantity: element.quantity,
        total: this.totalCalc()
      })
    });
    this.posService.addTocart(dataList).subscribe(
      a => {
        this.successCart = a;
      }
    );
  }

  taxCalc() {
    const totalPriceProd = this.selectedProductList.reduce((total, value)=>{
      total = total + value.price;
      return total;
    }, 0);
    return ((totalPriceProd * this.cart.tax)/100);
  }


  discCals() {
    const totalPriceProd = this.selectedProductList.reduce((total, value)=>{
      total = total + value.price;
      return total;
    }, 0);
    return ((totalPriceProd * this.cart.discount)/100);
  }

  get subTotal(){
    const totalPriceProd = this.selectedProductList.reduce((total, value)=>{
      total = total + value.price;
      return total;
    }, 0);

    return  totalPriceProd + this.taxCalc();
  }

  totalCalc() {
    const totalPriceProd = this.selectedProductList.reduce((total, value)=>{
      total = total + value.price;
      return total;
    }, 0);

    return  totalPriceProd + this.taxCalc() - this.discCals();
  }

  get total(){
    return this.totalCalc();
  }


  get getDiscount() {
    return this.discCals();
  }

  get getTax() {
    return this.taxCalc()
 }



}
