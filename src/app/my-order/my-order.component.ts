import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../order.model';
import { Subscription } from 'rxjs';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit, OnDestroy {

  constructor(private dataService:DataService) { }

  myOrder:Order;
  subscription:Subscription;
  isOrdered:boolean = false;
  sumTimeCurrent:number[] = [];
  presentToast = false;
  minPriceToOrder;
  makeSureMessage:boolean = false;

  ngOnInit() {

    this.myOrder = this.dataService.getMyOrder();
    this.minPriceToOrder = this.dataService.minPriceToOrder;
    

    this.subscription = this.dataService.orderChanged.subscribe(
      (order: Order) => {
        this.myOrder = order;
        this.sumTimeCurrent = new Array(this.myOrder.rations.length);
        let sum = 0;
        for(let i=0 ; i<this.myOrder.rations.length ; i++)
        {
          this.sumTimeCurrent[i] = sum;
          sum+=this.myOrder.rations[i].preparationTime+this.myOrder.rations[i].extras.length*2;
        }
      }
    );

    this.subscription = this.dataService.toastModeChanged.subscribe(
      (mode: boolean) => {
        this.presentToast = mode;
      }
    );
    this.subscription = this.dataService.toastModeChanged.subscribe(
      (mode: boolean) => {
        this.makeSureMessage = mode;
      }
    );
    this.subscription = this.dataService.toastModeChanged.subscribe(
      (mode: boolean) => {
         this.isOrdered = mode;
         if(this.isOrdered)
         {
           this.dataService.setIsOrdered(this.isOrdered);
         }
           this.makeSureMessage = false;
           this.presentToast = false; 
      }
    );
    
    

    /*for(let i = 0 ; i<this.myOrder.rations.length ; i++)
    {
      this.sumTimeCurrent[i]+= this.myOrder.rations[i].preparationTime;
    }
    */
  }

  hasOrdered()
  {
    return this.myOrder.beverages.length > 0 || this.myOrder.rations.length > 0;
  }

  hasRations()
  {
    return this.myOrder.rations.length > 0;
  }

  hasBeverages()
  {
    return this.myOrder.beverages.length > 0;
  }

  onOrderNow()
  {
    if(this.myOrder.totalPrice < this.minPriceToOrder)
    {
      this.presentToast = true;
    }
    else
    {
      this.makeSureMessage = true;
    }
    
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
