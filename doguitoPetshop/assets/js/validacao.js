export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
    }
}

const tipoErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const menasgensErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio',
        typeMismatch: 'O email digitado não é válido'
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio',
        patternMismatch: `<b style="font-weight: bold" >A senha deve ter:</b> <br> 
                    <br> * Entre 6 e 12 caracteres <br> 
                    <br> * Ao menos uma letra maiúscula uma letra mínuscula e um número. <br> 
                    <br> * A senha não pode conter símbolos e caracteres especiais <br> `
    },
    dataNascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio',
        customError: 'Você deve ter mais que 18 anos para se cadastrar'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio',
        customError: 'O CPF digitado não é válido'
    },
    cep: {
        valueMissing: 'O campo CEP não pode estar vazio',
        patternMismatch: 'O CEP digitado não é válido',
        customError: 'Não foi possível buscar o CEP'
    },
    logradouro: {
        valueMissing: 'O campo logradouro não pode estar vazio'
    },
    cidade: {
        valueMissing: 'O campo cidade não pode estar vazio'
    },
    estado: {
        valueMissing: 'O campo estado não pode estar vazio'
    }

}

const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input),
    cep: input=> recuperarCEP(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tipoErro.forEach(erro => {
        if (input.validity[erro]) {
            mensagem = menasgensErro[tipoDeInput][erro];
        }
    })
    return mensagem
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value);
    console.log(`Hora atual: ${dataRecebida}`);
    let mensagem = '';

    if (!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ter mais que 18 anos para se cadastrar';
    }

    input.setCustomValidity(mensagem);
}

function maiorQue18(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    console.log(`É maior de 18? ${dataMais18 <= dataAtual}`);
    return dataMais18 <= dataAtual
}


//#region Validações CPF
function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, '');
    let mensagem = '';

    if(!checaCpfRepetido(cpfFormatado) || !checaEstruturaCpf(cpfFormatado)){
        mensagem = 'O CPF digirado não é valido'
    }

    input.setCustomValidity(mensagem);
}

function checaCpfRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido = true;

    valoresRepetidos.forEach(valor => {
        if(valor == cpf){
            cpfValido = false
        }
    })

    return cpfValido;
}

function checaEstruturaCpf(cpf){
    const multiplicador = 10

    return checaDigitoVerificador(cpf, multiplicador)
}

function checaDigitoVerificador(cpf, multiplicador){
    if(multiplicador >= 12){
        return true
    }

    let multiplicadorInicial = multiplicador;
    let soma = 0;
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('')
    const digitoVerificador = cpf.charAt(multiplicador - 1);

    for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--){
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial;
        contador++
    }

    if(digitoVerificador == confirmaDigito(soma)){
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }

    return false
}

function confirmaDigito(soma){
    return 11 - (soma % 11)
}
//#endregion

function recuperarCEP(input){
    const cep = input.value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const options = {
        method: 'GET',
        mode: 'cors',
        headers:{
            'content-type': 'application/json;charset=utf-8'
        }
    }

    if(!input.validity.patternMismatch && !input.validity.valueMissing){
        fetch(url, options).then(
            response => response.json()
        ).then(
            data =>{
                console.log(data);
                if(data.erro){
                    input.setCustomValidity('Não foi possível buscar o CEP');
                    document.querySelector('[data-tipo="logradouro"]').value = '';
                    document.querySelector('[data-tipo="cidade"]').value = '';
                    document.querySelector('[data-tipo="estado"]').value = '';

                    return
                }
                input.setCustomValidity('');
                preencheCamposCEP(data)
                return
            }
        )
    }
}

function preencheCamposCEP(data){
    const logradouro = document.querySelector('[data-tipo="logradouro"]');
    const cidade = document.querySelector('[data-tipo="cidade"]');
    const estado = document.querySelector('[data-tipo="estado"]');

    logradouro.value = data.logradouro;
    cidade.value = data.localidade;
    estado.value = data.uf;
}