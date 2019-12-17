import { Injectable } from '@angular/core';
import { RationView } from './ration-view.model';
import { Ration } from './ration.model';
import { Beverage } from './beverage.model';
import { Order } from './order.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  orderChanged = new Subject<Order>();
  myOrder:Order = new Order([], [] , 0, 0);
  userRations:Ration[] = [];

  isOrdered:boolean = false;
  orderAct = new Subject<boolean>();
  fastingLevel = 10;
  minPriceToOrder = 80;
  toastModeChanged = new Subject<boolean>();

  beverages:Beverage[] = [new Beverage("Cola","../../assets/images/cola.png", 10),
                          new Beverage( "Fanta", "../../assets/images/fanta.png", 9),
                          new Beverage( "Water", "../../assets/images/water.png", 8),
                          new Beverage( "Beer","../../assets/images/beer.png" ,12),
                          new Beverage( "Nestea", "../../assets/images/nestea.png", 10),
                          new Beverage( "Soda", "../../assets/images/soda.png", 8)];
  rationsView: RationView[] = [
    new RationView("Hamburger",
      0,
      "Main-Ration",
      "http://lechembasar-herzeliya.co.il/wp-content/uploads/sites/20/2017/04/hamburger-vechips.jpg",
      60,
      ["Chips", "Onion-Rings", "Cheese", "Puree"],
      25),
    new RationView("Pizza",
      1,
       "Main-Ration",
      "https://d332juqdd9b8hn.cloudfront.net/wp-content/uploads/2019/05/pizzahutnewrecipe.jpg",
      55,
      ["Cheese", "Onion", "Olives", "Corn", "Pineapple", "Tomatoes"],
      30),
    new RationView("Soup",
      2,
      "First-Ration",
      "https://www.inspiredtaste.net/wp-content/uploads/2018/10/Homemade-Vegetable-Soup-Recipe-2-1200.jpg",
      30,
      ["Vegetables", "Sweet-Potato", "Meat"],
      15),
    new RationView("Hummus-Plate",
      3,
      "First-Ration",
      "https://besttv232-ynet-images1-prod.cdn.it.best-tv.com/PicServer2/24012010/3186566/4_wa.jpg",
      15,
      ["Falafel", "Mushrooms", "Spicy", "Tehina"],
      5),
      new RationView("Carrot-Salad",
      4,
      "First-Ration",
      "http://www.10dakot.co.il/wp-content/uploads/2017/02/DSC_0081.jpg",
      20,
      ["Hot-Pepper", "Garlic-Sauce"],
      7)
  ];
  
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
