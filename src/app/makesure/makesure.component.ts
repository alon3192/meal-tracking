import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-makesure',
  templateUrl: './makesure.component.html',
  styleUrls: ['./makesure.component.css']
})
export class MakesureComponent implements OnInit {

  constructor(private dataService:DataService) { }
  confirmTheOrder:boolean = false;
  somethingPressed:boolean = false;

  ngOnInit() {
  }

  onClick(answer:boolean)
  {
    this.somethingPressed = true;
    this.confirmTheOrder = answer;
    this.dataService.orderConfirmed(this.confirmTheOrder);
  }
  

  hasPushed()
  {
    if(this.somethingPressed)
    {
      return "toast_press_ok";
    }
  }
  enableScreen()
  {
    if(this.somethingPressed)
    {
      return "enable_screen";
    }  
  }

}
