
class Scanner {
    source: string | null

    constructor(source: string | null){
        this.source = source

        this.scanTokens();
    }

    scanTokens(){
        return [this.source]
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
