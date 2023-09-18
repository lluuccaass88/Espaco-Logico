export class Paint{
    valX?: number;
    valY?: number
    linkedInstructionId?: number;
    
    constructor(valX?: number, valY?: number){
        this.valX = valX;
        this.valY = valY;
    }

    
    public setLinkedInstructionId(linkedInstructionId?: number){
        this.linkedInstructionId = linkedInstructionId;
    }
}