import { Cliente } from "./Cliente.js";

export class ContaCorrente {
    static numeroDeContas = 0;
    constructor(cliente, agencia){
        super(0, cliente, agencia);
        ContaCorrente.numeroDeContas += 1;
    }

    //Sobreescrevendo o método de sacar
    sacar(valor){
        const taxa = 1.1;
        return this.sacar(valor, taxa);
    }
}