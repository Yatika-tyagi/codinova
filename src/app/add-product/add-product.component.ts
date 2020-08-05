import { Component, OnInit } from '@angular/core';
import { posService } from './../pos.service';

@Component({
  selector: 'app-root',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
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

  }

  addProdcut(){
    this.posService.addProduct({});
  }

}
