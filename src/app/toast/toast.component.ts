import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input() totalPrice:number;
  toSpend:number;
  ok:boolean = false;
  minPriceToOrder;
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.minPriceToOrder = this.dataService.minPriceToOrder;
    this.toSpend = this.minPriceToOrder - this.totalPrice;
  }

  onClick()
  {
    this.ok = true;
    this.dataService.setToast();
  }

  hasPushed()
  {
    if(this.ok)
    {
      return "toast_press_ok";
    }
  }
  enableScreen()
  {
    if(this.ok)
    {
      return "enable_screen";
    }  
  }

}
