import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Ration } from '../ration.model';
import { Subscription } from 'rxjs';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-ration-ordered',
  templateUrl: './ration-ordered.component.html',
  styleUrls: ['./ration-ordered.component.css']
})
export class RationOrderedComponent implements OnInit, OnDestroy {

  constructor(private dataService:DataService) { }

  @Input() ration:Ration;
  totalPrice:number;
  preparationTime:number;
  timeLeft:number = -1;
  subscription:Subscription;
  isOrdered:boolean = false;
  interval;
  @Input() timeToWait:number;

  


  minutes;
  seconds;

  ngOnInit() {

    this.totalPrice = this.ration.price;
    this.totalPrice+=this.ration.extras.length*5;

    this.preparationTime = this.ration.preparationTime;
    this.preparationTime+=this.ration.extras.length*2;

    this.minutes = this.preparationTime;
    if(this.minutes < 10)
    {
      this.minutes = "0" + this.minutes;
    }
    this.seconds = "00";

    this.subscription = this.dataService.orderAct.subscribe(
      (done:boolean) => {
        this.isOrdered = done;
        this.timerBegin();
      }
    );
  }
  
  hasExtras()
  {
    if(this.ration.extras.length > 0)
    {
      return true;
    }
    return false;
  }

  getPreparationTime()
  {
    let preparationTime = this.preparationTime;
    let preparationTimeString = preparationTime + " : 00";
    if(preparationTime < 10)
    {
      preparationTimeString = "0" + preparationTimeString;
    }
    return preparationTimeString;
  }

  timerBegin()
  {
    this.timeToWait = this.timeToWait*60;
    this.timeLeft = this.preparationTime*60;
    
    setTimeout(()=>{    
      this.countdoenBegin();
    }, this.timeToWait*this.dataService.fastingLevel);

  }

  countdoenBegin()
  {
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
        audio.src = "../../assets/sounds/ready.mp3";
        audio.load();
        audio.play();
        
      }
    },this.dataService.fastingLevel)
  }



  inProcess()
  {
    return this.isOrdered && this.timeLeft > 0;
  }

  isrationReadey()
  {
    return this.timeLeft === 0;
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
