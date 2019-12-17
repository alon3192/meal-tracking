export class Ration {
    constructor(public name: string,
                public id: number, 
                public imageUrl: string,
                public preparationTime: number,
                public category: string,
                public price:number,
                public extras: string[]) {}
}