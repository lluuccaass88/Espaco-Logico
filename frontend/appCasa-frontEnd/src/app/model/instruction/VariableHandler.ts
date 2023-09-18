export class VariableHandler{
    name?: string;
    manipulation?: number;
    value?: number;
    linkedInstructionId?: number;

    constructor(name?: string, manipulation?: number, value?: number){
        this.name = name;
        this.manipulation = manipulation;
        this.value = value;
    }

    public setLinkedInstructionId(linkedInstructionId?: number){
        this.linkedInstructionId = linkedInstructionId;
    }

}