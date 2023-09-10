import { For } from "./For";
import { If } from "./If";
import { NewVariable } from "./NewVariable";
import { Paint } from "./Paint";
import { VariableHandler } from "./VariableHandler";

export class Instruction {

    idInstruction?:number;
    type?: string;
    positionX?: number;
    positionY?: number;
    previous?: number;

    newVariable?: NewVariable
    variableHandler?: VariableHandler
    paint?: Paint
    ifC?: If
    forC?: For


    constructor(type?: string, newVariabele?: NewVariable, variableHandler?: VariableHandler, paint?: Paint,
        newIf?: If, newFor?: For){
        this.type = type;
        this.newVariable = newVariabele;
        this.variableHandler = variableHandler;
        this.paint = paint;
        this.ifC = newIf;
        this.forC = newFor;
    }



    // idInstruction?:number;
    // type?: String;
    // positionX?: number;
    // positionY?: number;
    // previous?: number;

    // condition?: string;

    // val1?: number;
    // val2?: number;

    // variableName?:String;
    // manipulationVariable?:number;
    // valueManipulation?:String;


    // constructor(
    //     type?: string,
    //     val1?: number,
    //     val2?: number,
    //     condition?: string,
    //     variableName?: string,
    //     manipulationVariable?: number,
    //     valueManipulation?: string
    //   ) {
    //     this.type = type;
    //     this.condition = condition;
    //     this.val1 = val1;
    //     this.val2 = val2;
    //     this.variableName = variableName;
    //     this.manipulationVariable = manipulationVariable;
    //     this.valueManipulation = valueManipulation;
    //   }


    // public getStruction():any{
    //     return {
    //         type: this.type, 
    //         positionX: this.positionX,
    //         positionY: this.positionY,
    //         previous: this.previous,
    //         comand: {
    //             newVariable: {

    //             },
    //             manipulateVariable: {
    //                 variableName: this.variableName,
    //                 manipulationVariable: this.manipulationVariable,
    //                 valueManipulation: this.valueManipulation
    //             },
    //             paint: {
    //                 val1: this.val1,
    //                 val2: this.val2
    //             }
    //         }

    //     }
    // }

    public setIdInstruction(idInstruction:number){
        this.idInstruction = idInstruction
    }

    public getIdInstruction():number|undefined{
        return this.idInstruction
    }

    public setPrevious(previous:number|undefined){
        this.previous = previous;
    }

  }
  