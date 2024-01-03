import { PricedElement } from "./base";

export class BagOfPeanuts implements PeanutProduct {
    readonly simpleName = 'Bag of peanuts';
    readonly peanutsAmount = 15;
    readonly initialProductionCost = 50;
}

export class SinglePeanut implements PeanutProduct {
    readonly simpleName = 'A peanut';
    readonly peanutsAmount = 1;
    readonly initialProductionCost = 3;
}

export interface PeanutProduct extends PricedElement {
    peanutsAmount: number;
}

export interface PeanutProducer extends PricedElement {
    output: number;
    howOftenInMiliseconds: number;
}
