import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { RationView } from '../ration-view.model';
import { Beverage } from '../beverage.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  


  constructor(private dataService:DataService) { }

  rationsView:RationView[] = [];
  rationViewFirst:RationView[] = [];
  rationViewMain:RationView[] = [];
  beverages:Beverage[] = [];
  

  ngOnInit() {

    setTimeout(()=>{    
      this.rationsView = this.dataService.getRationsView();
    this.beverages = this.dataService.getBeverages();
    this.sortCategory();
    }, 100);
    
    
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

}
