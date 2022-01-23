import {Cliente} from "./Cliente.js";
import {ContaCorrente} from "./ContaCorrente.js";

const cliente1 = new Cliente("Gabriel", "04236059177");
const cliente2 = new Cliente("Kalora", "88.822.233-09");

const conta1 = new ContaCorrente(1001, cliente1);
conta1.depositar(500);
const conta2 = new ContaCorrente(1002, cliente2);

let valor = 200
conta1.transferir(valor, conta2);

console.log("--------------------");
console.log("Conta 1: \n", conta1, "\nConta2: \n", conta2);
console.log("Existem: " + ContaCorrente.numeroDeContas + " contas ativas");
