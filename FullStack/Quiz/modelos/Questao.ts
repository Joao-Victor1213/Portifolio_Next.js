


import Resposta from '@/modelos/Resposta'

export default class Questao {
    private Id:number
    private Pergunta:string
    private Respostas:Resposta[]
    private Respondida:boolean
    private Acertou:boolean

    constructor(id:number, pergunta:string, respostas:Resposta[] = [], respondida = false, acertou = false) {
        this.Id = id
        this.Pergunta = pergunta
        this.Respondida = respondida   
        this.Acertou = acertou 
        this.Respostas = respostas 
    }
    
    /*Getters*/
    public get id() : number {
        return this.Id
    }

    public get pergunta() : string {
        return this.Pergunta
    }

    public get respostas() : Resposta[] {
        return this.Respostas
    }

    public get respondida() : boolean {
        return this.Respondida
    }

    public get acertou() : boolean {
        return this.Acertou
    }

    /*Setters*/
    
    public set respostas(v : Resposta[]) {
        this.Respostas = v;
    }
    

    /*Metodos*/

    public buscaResposta(id:number) {
            if(id < this.Respostas.length && id >= 0){ //Se está dentro do tamanho de respostas
                return this.Respostas[id]
            }

        return 0 //Caso a resposta não seja encontrada pois o valor do id é invalido
    }

    private buscaIdRespostaCerta() : number{
        let id:number = -1
        this.Respostas.forEach((resposta, key)=>{
            if(resposta.certa){
                id = key
            }
        })


        return id 
    }

    public responder(idResposta:number) : Questao{  //Retorna uma nova questão com os valores atualizados (Isso sera usado para facilitar as variaveis de estado)
        this.Respondida = true
        const resposta = this.buscaResposta(idResposta)
        
        if(resposta != 0){
            if(resposta.certa){ // Se ele acertou revela somente a resposta certa e define acertou como true
                this.Respostas[idResposta].revelada = true
                this.Acertou = true 
            }else{
                this.Respostas[this.buscaIdRespostaCerta()].revelada = true
                this.Respostas[idResposta].revelada = true

            }
        }
        
        const questao:Questao = new Questao(this.Id, this.Pergunta,this.Respostas,true, this.Acertou)
        return questao
    }

}