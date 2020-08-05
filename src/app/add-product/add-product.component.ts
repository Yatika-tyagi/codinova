import { Component, OnInit } from '@angular/core';
import { posService } from './../pos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  selectedProductList: any = [];
  selectedProduct: any = {};
  activeCategory: String = '';
  productForm: FormGroup;

  constructor(private posService: posService) {

  }

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      quantity: new FormControl(''),
      price: new FormControl(''),
      category: new FormControl(''),
    });

  }

  onSubmit(){
    this.posService.addProduct(this.productForm.value).subscribe(a =>{
      console.log(a);
    });
  }
}
