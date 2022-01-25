// Classe "abstrata" (Deve ser utilizada apenas de forma herdada)
export class Conta{
    constructor(saldoIncial, cliente, agencia){
        if(this.constructor == Conta){
            throw new Error("Você não deveria instanciar um objeto do tipo conta, diretamente. Tente usar algo como: \"ContaCorrente\", \"ContaPoupanca\" ");
        }

        this._saldo = saldoIncial;
        this._cliente = cliente;
        this._agencia = agencia;       
    }

    set cliente(novoValor){
        if(novoValor instanceof Cliente){
            this._cliente = novoValor;
        }        
    }

    get cliente(){
        return this._cliente;
    }

    get saldo(){
        return this._saldo;
    }

    //Método Abstrato
    sacar(valor){
        throw new Error("O método \"Sacar\" da conta é abstrato");
    }

    _sacar(valor, taxa){
        const valorSacado = taxa * valor;
        if(this._saldo >= valorSacado){
            this._saldo = valorSacado;
            return valorSacado;
        }
        return 0;
    }
    
    depositar(valor){
        this._saldo += valor;
    }

    transferir(valor, conta){
        const valorSacado = this.sacar(valor);
        conta.depositar(valorSacado);
    }
}