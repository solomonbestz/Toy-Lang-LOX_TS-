import { TokenType } from "./tokenType.ts";
import { Token } from "./token.ts";

class Scanner {
    source?: string | null 
    tokens: Token[] = [];
    start = 0;
    current = 0;
    line = 1;

    constructor(source: string | null){
        this.source = source

        
    }

    scanTokens<Token>(){
        while(!this.isAtEnd()){
            this.start = this.current;
            this.scanToken()
        }
        this.tokens.add(new Token(EOF, "", null, line))
        return this.tokens
    }

    scanToken(){

    }

    isAtEnd(){
        return this.current >= this.source?.length
    }
}

class Lox {
    hadError: boolean
    
    constructor(){
        this.hadError = false
        console.log("Usage: TLox [script]");
    }

    error(line: number, message: string){
        this.report(line,"", message)
    }

    report(line: number, where: string, message: string){
        console.log(
            "[line " + line + "] Error " + where + ": " + message
        )
        this.hadError = true
    }

    runFile(){
        if(this.hadError) Deno.exit(0)
    }

    runPrompt(){
        const input = prompt();
        this.run(input)
    }

    run(source: string | null){
        const scanner = new Scanner(source)
        tokens: [] = scanner.scanTokens(); 
    }
}

let lox = new Lox();

console.log(lox.run("Hello"))
