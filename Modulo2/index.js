class Cliente{
    nome;
    cpf;
}

class ContaCorrente {
    agencia;
    // #saldo =0 https://github.com/tc39/proposal-class-fields#private-fields
    #saldo = 0;

    sacar(valor){
        console.log("+++++ Sacando o valor de R$:" + valor + " +++++");
        if(this.#saldo >= valor){
            this.#saldo -= valor;
            console.log("***** Operação concluída com sucesso! *****\n*****Seu saldo é R$:" + this.#saldo + "******\n");
            return valor;
        } else {
            console.log("***** Saldo insuficiente! *****\n*****Seu saldo é R$:" + this.#saldo + "******\n");
        }
    }

    depositar(valor){
        console.log("+++++ Depositando o valor de de R$:" + valor + "+++++");
        if(valor > 0){
            this.#saldo += valor;
            console.log("***** Operação concluída com sucesso! *****\n\n*****Seu saldo é R$:" + this.#saldo + "******\n");
            return valor;
        } else {
            console.log("***** O valor deve ser positivo! *****\n*****Seu saldo é R$:" + this.#saldo + "******\n")
        }
    }

}

const cliente1 = new Cliente();
cliente1.nome = "Gabriel";
cliente1.cpf = 11122233309;

const cliente2 = new Cliente();
cliente2.nome = "Kalora";
cliente2.cpf = 88822233309;


const contaCorrente = new ContaCorrente();
contaCorrente.agencia = 1001;

contaCorrente.depositar(-100);
contaCorrente.depositar(100);
contaCorrente.depositar(100);

const valorSacado = contaCorrente.sacar(50);
console.log(valorSacado);

console.log(contaCorrente);