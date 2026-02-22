import { TokenType } from "./tokenType.ts";
import { Literal, Token } from "./token.ts";



class Scanner {
    source: string
    tokens: Token[] = [];
    start = 0;
    current = 0;
    line = 1;

    constructor(source: string){
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
        const char = this.advance()

        switch (char){
            case '(': this.addToken(TokenType.LEFT_PAREN); break;
            case ')': this.addToken(TokenType.RIGHT_PAREN); break;
            case '{': this.addToken(TokenType.LEFT_BRACE); break;
            case '}': this.addToken(TokenType.RIGHT_BRACE); break;
            case ',': this.addToken(TokenType.COMMA); break;
            case '.': this.addToken(TokenType.DOT); break;
            case '_': this.addToken(TokenType.MINUS); break;
            case '+': this.addToken(TokenType.PLUS); break;
            case ';': this.addToken(TokenType.SEMICOLON); break;
            case '*': this.addToken(TokenType.STAR); break;
            case '!': this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG); break;
            case '=': this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL); break;
            case '<': this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS); break;
            case '>': this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER); break;
            case '/':
                if(this.match('/')){
                    while(this.peek() != '\n' && !this.isAtEnd()) this.advance()
                } else {
                    this.addToken(TokenType.SLASH)
                }
                break;
            default: {
                const lox = new Lox()
                lox.error(this.line, "Unexpected Character.")
                break
            }
                
        }
    }

    isAtEnd(){
        return this.current >= this.source.length
    }

    advance(){
        this.current++
        return this.source?.charAt(this.current - 1)
    }


    addToken(type: TokenType, literal: Literal | null = null): void{
        const text = this.source.substring(this.start, this.current)
        this.tokens.push(new Token(type, text, literal, this.line))
    }

    match(expected: string): boolean{
        if(this.isAtEnd()) return false;
        if(this.source.charAt(this.current) != expected) return false;

        this.current++;
        return true;
    }

    peek(){
        if(this.isAtEnd()) return '\0'
        return this.source.charAt(this.current)
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
        if (input == null) return;
        this.run(input)
    }

    run(source: string){
        const scanner = new Scanner(source)
        const tokens: Token[] = scanner.scanTokens(); 
    }
}
