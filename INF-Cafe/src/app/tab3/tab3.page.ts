import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Order } from '../shared/orders';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  orders: Order[] = []

  constructor(private httpClient: HttpClient) {}

  ngOnInit(){
    this.getOrders().subscribe(order_data => {
      this.orders = order_data
      console.log(order_data)
    })
  }

  getOrders(): Observable<Order[]>{
    return this.httpClient.get<Order[]>('https://localhost:44379/api/order/getOrders')
  }

}
