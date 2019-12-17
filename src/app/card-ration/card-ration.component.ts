import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RationView } from '../ration-view.model';
import { Ration } from '../ration.model';
import { DataService } from '../data-service.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-card-ration',
  templateUrl: './card-ration.component.html',
  styleUrls: ['./card-ration.component.css']
})
export class CardRationComponent implements OnInit, OnDestroy {
  isPicked:boolean = false;
  userRarion:Ration = null;
  cardPicked:boolean = false;
  subscription:Subscription;
  isOrdered:boolean = false;
  

  constructor(private dataService:DataService) { }

  ngOnInit() {
  
    this.subscription = this.dataService.orderAct.subscribe(
      (done:boolean) => {
        this.isOrdered = done;
      }
    );
  }

  @Input() rationView:RationView;

  pickExtra(e) {
    

    if(e.target.checked) {
      this.userRarion.extras.push(e.target.value);
    }
    else {
      for(let i=0 ; i<this.userRarion.extras.length ; i++) {
        if(this.userRarion.extras[i]===e.target.value) {
          this.userRarion.extras.splice(i,1);
          
        }
      }
    }
    let id = this.userRarion.id;
    this.dataService.updateExtraToTheRationOrder(this.userRarion, id);
  }

  pickRation(e) {
  
        this.isPicked = e.target.checked;
        
      if(this.isPicked) {
          this.userRarion = new Ration(this.rationView.name,
                            this.rationView.id,
                            this.rationView.imageUrl,
                            this.rationView.preparationTime,
                            this.rationView.category,
                            this.rationView.price,
                            []); 
        this.dataService.addRationToTheOrder(this.userRarion);                   
      }
      else {
        
        this.dataService.removeRationFromTheOrder(this.userRarion.id);
        this.userRarion = null;
      }
  }

  getCheckboxMode() {
    if(this.isPicked!==true) {
      return false;
    }
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
