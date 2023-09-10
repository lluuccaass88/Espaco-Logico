export class If{
    valX?: number | string;
    valY?: number | string;
    condition?: string
    quantityInstructions: number | undefined;
    
    constructor(valX?: number | string, valY?: number | string, condition?: string, quantityInstructions?: number){
        this.valX = valX;
        this.valY = valY;
        this.condition = condition;
        this.quantityInstructions = quantityInstructions;
    }
}