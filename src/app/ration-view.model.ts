export class RationView {
    constructor(public name: string,
                public id:number,
                public category:string,
                public imageUrl:string,
                public price:number,
                public extras:string[],
                public preparationTime:number) {}
}