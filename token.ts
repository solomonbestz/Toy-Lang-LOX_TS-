import { TokenType } from "./tokenType.ts";

export type Literal = string | number | boolean | null;

export class Token{
    type: TokenType
    lexeme: string
    literal: Literal
    line: number

    constructor(type: TokenType, lexeme: string, literal: Literal, line: number){
        this.type = type
        this.lexeme = lexeme
        this.literal = literal
        this.line = line
    }

    toString(){
        return this.type + " " + this.lexeme + " " + this.literal
    }

    add(obj: object){

    }
}