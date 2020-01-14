import { Injectable } from '@angular/core';
import { RationView } from './ration-view.model';
import { Ration } from './ration.model';
import { Beverage } from './beverage.model';
import { Order } from './order.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { 
    

    this.setRationsView();
    this.setBeverages();
  }
  copyRations = [];
  rationsView: RationView[] = [];
  orderChanged = new Subject<Order>();
  myOrder:Order = new Order([], [] , 0, 0);
  userRations:Ration[] = [];

  isOrdered:boolean = false;
  orderAct = new Subject<boolean>();
  fastingLevel = 10;
  minPriceToOrder = 80;
  toastModeChanged = new Subject<boolean>();

  beveragesEmitter = new Subject<Beverage[]>();
  rationsEmitter = new Subject<RationView[]>();
  beverages:Beverage[] = []

  setRationsView()
  {
    this.http.get <RationView[]>('../assets/data/data-rations-view.json')
    .subscribe(rations =>{
     for(let i=0 ; i<rations.length ; i++) {
      this.rationsView.push(new RationView(rations[i].name, rations[i].id, rations[i].category, rations[i].imageUrl, rations[i].price, rations[i].extras, rations[i].preparationTime))
     }
     this.rationsEmitter.next(this.rationsView);
    })
  }
  setBeverages()
  {
    this.http.get<Beverage[]>('../assets/data/data-beverages.json')
    .subscribe(beverages => {
      for(let i=0 ; i<beverages.length ; i++) {
        this.beverages.push(new Beverage(beverages[i].name, beverages[i].imageUrl, beverages[i].price));
      }
      this.beveragesEmitter.next(this.beverages);
    })
  }

  getMyOrder()
  {
    return this.myOrder;
  }

  getRationsView()
  {
    return this.rationsView.slice();
  }
  getBeverages() {
    return this.beverages.slice();
  }

  getRationById(id:number) {
    return this.rationsView[id];
  }

  addRationToTheOrder(ration:Ration)
  {
    let tmpExtras:string[] = [];
    for(let i=0 ; i<ration.extras.length ; i++)
    {
      tmpExtras.push(ration.extras[i]);
    }
    let tmpRation:Ration = new Ration(ration.name, ration.id, ration.imageUrl, ration.preparationTime, ration.category, ration.price, tmpExtras);
    this.myOrder.rations.push(tmpRation);
    this.myOrder.totalPrice = this.myOrder.totalPrice + ration.price;
    this.myOrder.preparationTime = this.myOrder.preparationTime + ration.preparationTime;
    this.orderChanged.next(this.myOrder);
  }
  removeRationFromTheOrder(id:number)
  {
    for(let i=0 ; i<this.myOrder.rations.length ; i++) {
      if(this.myOrder.rations[i].id === id) {

        this.myOrder.totalPrice = this.myOrder.totalPrice - this.myOrder.rations[i].price;
        this.myOrder.preparationTime = this.myOrder.preparationTime - this.myOrder.rations[i].preparationTime;
        this.myOrder.rations.splice(i,1);
        break;
      }
    }
    this.orderChanged.next(this.myOrder);
  }
  updateExtraToTheRationOrder(ration:Ration, id:number)
  {
    let tmpExtras:string[] = [];
    for(let i=0 ; i<ration.extras.length ; i++)
    {
      tmpExtras.push(ration.extras[i]);
    }
    let tmpRation:Ration = new Ration(ration.name, ration.id, ration.imageUrl, ration.preparationTime, ration.category, ration.price, tmpExtras);
    for(let i=0 ; i<this.myOrder.rations.length ; i++)
     {
      if(this.myOrder.rations[i].id === id) {

          this.myOrder.preparationTime = this.myOrder.preparationTime - 2* this.myOrder.rations[i].extras.length;
          
          this.myOrder.totalPrice = this.myOrder.totalPrice - 5* this.myOrder.rations[i].extras.length;

          this.myOrder.preparationTime = this.myOrder.preparationTime + 2* ration.extras.length;
          this.myOrder.totalPrice = this.myOrder.totalPrice + 5* ration.extras.length;
          this.myOrder.rations[i] = tmpRation;
          break;
      }
     } 
     this.orderChanged.next(this.myOrder);
  }

  addBeverageToTheOrder(beverage:Beverage)
  {
    let tmpBeverage:Beverage = new Beverage(beverage.name, beverage.imageUrl, beverage.price);
    this.myOrder.beverages.push(tmpBeverage);
    this.myOrder.totalPrice = this.myOrder.totalPrice + beverage.price;
    this.orderChanged.next(this.myOrder);
  }

  removeBeverageFromTheOrder(name:string)
  {
    for(let i=0 ; i<this.myOrder.beverages.length ; i++) {
      if(this.myOrder.beverages[i].name === name) {
         this.myOrder.totalPrice = this.myOrder.totalPrice - this.myOrder.beverages[i].price;
        this.myOrder.beverages.splice(i,1);
        break;
      }
    }
    this.orderChanged.next(this.myOrder);
  }

  setIsOrdered(isOrdered:boolean)
  {
    this.isOrdered = isOrdered;
    this.orderAct.next(this.isOrdered);
  }
  setToast()
  {
    setTimeout(()=>{    
      this.toastModeChanged.next(false);
    }, 1500); 
  }
  orderConfirmed(answer:boolean)
  {
    setTimeout(()=>{    
      this.toastModeChanged.next(answer);
    }, 1500); 
  }

}
