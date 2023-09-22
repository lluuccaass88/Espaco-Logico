import { Instruction } from "./Instruction";

export class If{
    valX?: number | string;
    valY?: number | string;
    condition?: string
    quantityInstructions: number = 5;
    intructions: Instruction[] = [];

    constructor(valX?: number | string, valY?: number | string, condition?: string, 
        quantityInstructions?: number, instructions?: any){
        this.valX = valX;
        this.valY = valY;
        this.condition = condition;
        if(quantityInstructions)
        this.quantityInstructions = quantityInstructions;
        if(instructions)
        this.intructions = instructions;
    }

    public setInstructions(instruction: Instruction){
        this.intructions?.push(instruction);
    }
}