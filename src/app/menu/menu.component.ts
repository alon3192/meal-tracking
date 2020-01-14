import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data-service.service';
import { RationView } from '../ration-view.model';
import { Beverage } from '../beverage.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(private dataService:DataService) {}
  subscription:Subscription;
  rationsView:RationView[] = [];
  rationViewFirst:RationView[] = [];
  rationViewMain:RationView[] = [];
  beverages:Beverage[] = [];
  

  ngOnInit() {
    this.subscription = this.dataService.rationsEmitter.subscribe(
      (rations: RationView[]) => {
        this.rationsView = rations;
        this.sortCategory();
      });

      this.subscription = this.dataService.beveragesEmitter.subscribe(
        (beverages: Beverage[]) => {
          this.beverages = beverages;
          
        });
  }

  sortCategory() {
    for(let i=0 ; i<this.rationsView.length ; i++) {
      if(this.rationsView[i].category === "Main-Ration") {
        this.rationViewMain.push(this.rationsView[i]);
      }
      else {
        this.rationViewFirst.push(this.rationsView[i]);
      }
    }
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
