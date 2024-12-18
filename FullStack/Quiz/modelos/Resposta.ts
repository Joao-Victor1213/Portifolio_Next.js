export default class Resposta {
    private Valor:string
    private Revelada:boolean
    private Certa:boolean

    constructor(valor:string, revelada = false, certa:boolean) {
        this.Valor = valor
        this.Revelada = revelada
        this.Certa = certa
    }

    
    public get valor() : string {
        return this.Valor
    }

    public get revelada() : boolean {
        return this.Revelada
    }

    public get certa() : boolean {
        return this.Certa
    }
    
    /*setters*/
    public set revelada(revelada:boolean)  {
        this.Revelada = revelada
    }
    
}