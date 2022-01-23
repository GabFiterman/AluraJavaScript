import {Cliente} from "./Cliente.js";
import {ContaCorrente} from "./ContaCorrente.js";
import {ContaPoupanca} from "./ContaPoupanca.js";
import {Conta} from "./Conta.js";

const cliente1 = new Cliente("Gabriel", "04236059177");

const conta1 = new Conta(0, cliente1, 1001);

conta1.depositar(500);
conta1.sacar(100);

const ContaPoupanca = new ContaPoupanca(50, cliente1, 1001);

console.log("--------------------"); 
console.log(ContaPoupanca);
console.log(conta1);