import { Instruction } from "./Instruction";

export class For{
    valX?: number | string;
    valY?: number | string;
    condition?: string
    quantityInstructions: number = 5;
    intructions: Instruction[] = [];
    
    constructor(valX?: number | string, valY?: number | string, condition?: string,
        quantityInstructions?: number){
        this.valX = valX;
        this.valY = valY;
        this.condition = condition;
        if(quantityInstructions)
        this.quantityInstructions = quantityInstructions;
    }

    public setInstructions(instruction: Instruction){
        this.intructions?.push(instruction);
    }
}