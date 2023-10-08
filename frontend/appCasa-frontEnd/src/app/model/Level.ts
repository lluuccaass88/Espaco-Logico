export class Level{
    valX?: number;
    valY?: number

    seq_id?: number
	question?: String
	answer?: []
    
    constructor(seq_id?: number, question?: String, answer?: []){
        this.seq_id = seq_id;
        this.question = question;
        this.answer = answer;
    }

}