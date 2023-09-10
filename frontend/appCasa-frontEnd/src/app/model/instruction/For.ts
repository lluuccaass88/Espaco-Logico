export class For{
    valX?: number | string;
    valY?: number | string;
    condition?: string
    
    constructor(valX?: number | string, valY?: number | string, condition?: string){
        this.valX = valX;
        this.valY = valY;
        this.condition = condition;
    }
}