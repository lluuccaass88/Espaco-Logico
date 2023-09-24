import { For } from "./For";
import { If } from "./If";
import { NewVariable } from "./NewVariable";
import { Paint } from "./Paint";
import { VariableHandler } from "./VariableHandler";

export class Instruction {

    userId?: String;
    idInstruction?:number;
    type?: string;
    positionX?: number;
    positionY?: number;
    previous?: number;
    newVariable?: NewVariable
    variableHandler?: VariableHandler
    paint?: Paint
    ifC: If | undefined 
    forC?: For

    constructor(type?: string, newVariabele?: NewVariable, variableHandler?: VariableHandler, paint?: Paint,
        newIf?: If, newFor?: For, positionX?: number, positionY?: number, userId?: String | null){
        this.type = type;
        this.newVariable = newVariabele;
        this.variableHandler = variableHandler;
        this.paint = paint;
        if(newIf != undefined)
            this.ifC = newIf;
        this.forC = newFor;
        this.positionX = positionX;
        this.positionY = positionY;
        if(userId)
            this.userId = userId;
    }

    public setIdInstruction(idInstruction:number){
        this.idInstruction = idInstruction
    }

    public getIdInstruction():number|undefined{
        return this.idInstruction
    }

    public setPrevious(previous:number|undefined){
        if(previous)
        this.previous = previous-1;
    }

  }
  