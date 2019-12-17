import { Ration } from './ration.model';
import { Beverage } from './beverage.model';

export class Order {
    constructor( public rations:Ration[], public beverages:Beverage[], public totalPrice:number, public preparationTime:number ) {}
}