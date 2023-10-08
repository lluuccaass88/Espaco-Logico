export class VariableHandler{
    name?: string;
    manipulation?: string;
    value?: number;
    linkedInstructionId?: number;

    constructor(name?: string, manipulation?: string, value?: number){
        this.name = name;
        this.manipulation = manipulation;
        this.value = value;
    }

    public setLinkedInstructionId(linkedInstructionId?: number){
        this.linkedInstructionId = linkedInstructionId;
    }

}