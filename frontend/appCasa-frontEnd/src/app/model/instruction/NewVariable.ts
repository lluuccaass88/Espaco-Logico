export class NewVariable{
    name?:string;
    value?:number = 0;

    constructor(name?: string, value?: number){
        this.name = name;
        this.value = value;
    }
}