import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data-service.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit, OnDestroy {

  constructor(private dataService:DataService) { }
  subscription:Subscription;
  isOrdered:boolean = false;
  myOrder:Order;
  interval;
  minutes;
  seconds;
  timeToWait;
  timeLeft:number = 15 * 60;
  deliveryTime:boolean = false;
  timerStart

  ngOnInit() {
    
    this.timerStart = Date.now();
    this.myOrder = this.dataService.getMyOrder();

    this.subscription = this.dataService.orderChanged.subscribe(
      (order: Order) => {
        this.myOrder = order;
        
      });

    this.subscription = this.dataService.orderAct.subscribe(
      (done:boolean) => {
        this.isOrdered = done;
        this.timeToWait = this.myOrder.preparationTime * 60;
        
        this.timerBegin();

       /* document.getElementById("cycle_div").style.animationDelay = "13s"/*"" + (this.timeToWait * this.dataService.fastingLevel) + "ms"*/;
      }
    );

    this.minutes = "15";
    this.seconds = "00";
  }

  timerBegin()
  {
   
   let fromLoadThePage = Date.now()-this.timerStart;
   
   let totalDelay = this.timeToWait*this.dataService.fastingLevel + fromLoadThePage;
   let totalDuration = 15*60*this.dataService.fastingLevel;
    
    document.getElementById("cycle_div").style.animationDelay = "" + totalDelay + "ms";
    document.getElementById("cycle_div").style.animationDuration = "" + totalDuration + "ms";
    setTimeout(()=>{    
      this.countdownBegin();
    }, this.timeToWait*this.dataService.fastingLevel);
  }

  countdownBegin()
  {
    this.deliveryTime = true;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        
        this.seconds = Number.parseInt("" + this.timeLeft % 60);
        if(this.seconds < 10)
        {
          this.seconds = "0" + this.seconds;
        }

        this.minutes = Number.parseInt("" + this.timeLeft / 60);

        if(this.minutes < 10)
        {
          this.minutes = "0" + this.minutes;
        }

      } else {
        this.timeLeft = 0;
        clearInterval(this.interval); 

        var audio = new Audio();
        audio.src = "../../assets/sounds/bell.mp3";
        audio.load();
        audio.play();
      }
    },this.dataService.fastingLevel)
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
