import { Product } from './../shared/product';
import { OrderLine } from './../shared/orders';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors} from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  products: Product[] = []
  orderLineForm = new FormGroup({});


  constructor(private httpClient: HttpClient, private toastController: ToastController, private formbuilder : FormBuilder) { }

  ngOnInit(){
    this.getProducts().subscribe(data => {
      this.products = data
      for(var i = 0; i < this.products.length; i++)
      {
        this.products[i].quantity = 1;
      }
      console.log(localStorage)
    })
    this.orderLineForm = this.formbuilder.group({
      productId: [''],
      productPrice: [''],
      productName: [''],
      productDescription: [''],
      quantity: ['', Validators.min((1))]
    })
  }
  
  getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>('https://localhost:44379/api/product/getProductList')
  }

  async toast1(){
    this.toastController.create({
      message: 'Please enter a quantity above zero',
      duration: 2000
    }).then((toast) => {
      toast.present();
  });
}

  onQuantityUpdate(Id,event)
  {
    let prod = this.products.find(product => product.productId == Id);
    prod.quantity = parseInt(event.target.value);
  }


  onSubmit(submittedProduct: Product) {

     let basket = JSON.parse(localStorage.getItem("productBasket")!); 
     let TempBasket = [] as Product[]; 

     if(basket != null || basket != undefined) 
     {
       TempBasket = basket;
     }

     let Orderline = submittedProduct;   

     if (Orderline.quantity <= 0){
       this.toast1();
      }

    if(TempBasket.length > 0){
        for(var i=0; i < TempBasket.length; i++)
        {
          if(submittedProduct.productId == basket[i].productId)
          { 

          }
          else
          {
            TempBasket.push(Orderline);
          }
        }
       }
       else
       {
          TempBasket.push(Orderline);
        }
    localStorage.setItem('productBasket', JSON.stringify(TempBasket))
    console.log(localStorage)
  }
}














//Create an orderline everytime the basket button is clicked and send to local storage
//    onSubmit(submittedForm : FormGroup) {
//     let Orderline = this.orderLineForm.value;
    
//     if (!localStorage.getItem('orderLine')){
//     let orderLine = [{
//       "productId" : Orderline.productId,
//       "productName" : Orderline.productName,
//       "productPrice" : Orderline.productPrice,
//       "quantity" : Orderline.quantity
//     }]
//     localStorage.setItem('orderLine', JSON.stringify(orderLine))
//     console.log(localStorage)
//   }
// }


