import { Order, OrderLine } from './../shared/orders';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  orderLines: OrderLine [] = []

  constructor(private httpClient: HttpClient) {}

  ngOnInit(){
    if (localStorage.getItem('productBasket')){
      this.orderLines = JSON.parse(localStorage.getItem('productBasket')!); 
  }
}

  //when the check out button is clicked, use API and create the order using the different orderline
  //When the delete button is clicked, remove the order
deleteOrderLine(submittedOrderLine: OrderLine){
  let formorderline = submittedOrderLine.productId; 

  if(this.orderLines.length > 0){
    for(var i=0; i < this.orderLines.length; i++){
      if(submittedOrderLine.productId == this.orderLines[i].productId || submittedOrderLine.quantity == this.orderLines[i].quantity){
        console.log(submittedOrderLine.quantity, this.orderLines[i].quantity);
        this.orderLines.splice(i, 1);
        localStorage.setItem('productBasket', JSON.stringify(this.orderLines));
     }
  console.log(localStorage);
    }
  }
}

addOrder(){
  let Order = JSON.parse(localStorage.getItem("productBasket"));
  console.log(Order);

 this.httpClient.post<OrderLine[]>('https://localhost:44379/api/order/createOrder', Order).subscribe(ordr => {
   this.orderLines
  });

  localStorage.clear();  
}


}


