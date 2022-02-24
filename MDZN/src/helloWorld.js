function helloWorld(){
    let inputTx = document.querySelector('.inputText');
    let nome = inputTx.value;

    document.querySelector('.nomeInserido').innerHTML = `Seja bem vindo(a) ${nome}`;

    inputTx.value = '';
    inputTx.focus();
}

function limpaTela(){
    let inputTx = document.querySelector('.inputText');
    inputTx.value = '';

    document.querySelector('.nomeInserido').innerHTML = '';
    inputTx.focus();
}