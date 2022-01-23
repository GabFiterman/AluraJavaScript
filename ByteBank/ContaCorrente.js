import { Cliente } from "./Cliente.js";

export class ContaCorrente {
    static numeroDeContas = 0;
    agencia;
    _cliente;
    _saldo = 0; // _saldo =0 https://github.com/tc39/proposal-class-fields_private-fields

    //#region Getters and Setters    
    set cliente(novoCliente){
        if(novoCliente instanceof Cliente){
            this._cliente = novoCliente;
        } else{
            console.error("Valor inválido para o cliente!");
        }
    }

    get cliente(){
        return this._cliente;
    }

    
    get saldo(){
        return this._saldo;
    }

    constructor(agencia, cliente){
        this.agencia = agencia;
        this.cliente = cliente;
        ContaCorrente.numeroDeContas += 1;
    }
    //#endregion

    //#region Métodos
    /** Saca um valor da conta
     * @param {valor} valor 
     * @returns 
     * @author Gabriel
     */
    sacar(valor){
        console.log("+++++ Sacando o valor de R$:" + valor + " +++++");
        if(this._saldo >= valor){
            this._saldo -= valor;
            console.log("Operação concluída com sucesso!\nSeu saldo é R$:" + this._saldo);
            return valor;
        } else {
            console.log("Saldo insuficiente!\nSeu saldo é R$:" + this._saldo);
        }
    }

    /** Deposita um valor na conta
     * @param {valor} valor 
     * @returns 
     * @author Gabriel
     */
    depositar(valor){
        console.log("+++++ Depositando o valor de de R$:" + valor + "+++++");
        if(valor <= 0){
            console.log("ERRO! só consigo depositar valores positivos!");
            return;
        } else {
            this._saldo += valor;
            console.log("Operação concluída com sucesso!\nSeu saldo é R$: " + this._saldo);
        }
    }

    /** Transfere da conta 'A' para a conta 'B'
     * @param {valor} valor 
     * @param {conta} conta
     * @author Gabriel
     */
    transferir(valor, conta){
        const valorSacado = this.sacar(valor);
        conta.depositar(valorSacado);
    }
    //#endregion
}