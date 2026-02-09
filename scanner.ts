
class Lox {
    hadError: boolean
    
    constructor(){
        this.hadError = false
        console.log("Usage: TLox [script]");
    }

    error(line: number, message: String){
        this.report(line,"", message)
    }

    report(line: number, where: String, message: String){
        console.log(
            "[line " + line + "] Error " + where + ": " + message
        )
        this.hadError = true
    }
}

var lox = new Lox();
