import { Component, OnInit, Input } from '@angular/core';
import { Beverage } from '../beverage.model';

@Component({
  selector: 'app-beverage-ordered',
  templateUrl: './beverage-ordered.component.html',
  styleUrls: ['./beverage-ordered.component.css']
})
export class BeverageOrderedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() beverage:Beverage;

}
