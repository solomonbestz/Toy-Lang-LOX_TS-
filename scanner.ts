import { TokenType } from "./tokenType.ts";
import { Token } from "./token.ts";


class Scanner {
    source?: string | null
    tokens: Token[] = [];
    start = 0;
    current = 0;
    line = 1;

    constructor(source?: string | null){
        this.source = source

        
    }

    scanTokens<Token>(){
        while(!this.isAtEnd()){
            this.start = this.current;
            this.scanToken()
        }
        this.tokens.add(new Token(TokenType.EOF, "", null, this.line))
        return this.tokens
    }

    scanToken(){
        let char = this.advance()

        switch (char){
            case '(': this.addToken(TokenType.LEFT_PAREN); break;
            case ')': this.addToken(TokenType.RIGHT_PAREN); break;
            case '{': this.addToken(TokenType.LEFT_BRACE); break;
            case '}': this.addToken(TokenType.RIGHT_BRACE); break;
            case ',': this.addToken(TokenType.COMMA); break;
            case '.': this.addToken(TokenType.DOT);
            case '_': this.addToken(TokenType.MINUS);
            case '+': this.addToken(TokenType.PLUS);
            case ';': this.addToken(TokenType.SEMICOLON);
            case '*': this.addToken(TokenType.STAR)
        }
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
