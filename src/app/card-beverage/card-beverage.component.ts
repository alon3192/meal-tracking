import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Beverage } from '../beverage.model';
import { DataService } from '../data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-beverage',
  templateUrl: './card-beverage.component.html',
  styleUrls: ['./card-beverage.component.css']
})
export class CardBeverageComponent implements OnInit, OnDestroy {

  constructor(private dataService:DataService) { }

  @Input() beverage:Beverage;
  isPicked:boolean = false;
  subscription:Subscription;
  isOrdered:boolean = false;

  ngOnInit() {

    this.subscription = this.dataService.orderAct.subscribe(
      (done:boolean) => {
        this.isOrdered = done;  
      }
    );
  }

  pickBeverage(e) {
    this.isPicked = e.target.checked;

    if(this.isPicked) {
      this.dataService.addBeverageToTheOrder(this.beverage);
    }
    else {
      this.dataService.removeBeverageFromTheOrder(this.beverage.name);
    }
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
