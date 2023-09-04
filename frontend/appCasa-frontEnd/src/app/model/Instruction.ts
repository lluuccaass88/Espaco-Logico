export class Instruction {
    positionX: number | undefined;
    positionY: number | undefined;
    condition: string | undefined;
    id: number | undefined;
    val1: number | undefined;
    val2: number | undefined;

    constructor(id: number, val1: number | undefined, val2: number  | undefined, condition?: string) {
        this.id = id;
        this.val1 = val1;
        this.val2 = val2;
        if(condition){
            this.condition = condition;
        }
      }    
  }
  