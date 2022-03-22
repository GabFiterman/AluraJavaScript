import { valida } from './validacao.js'

// alert('hello');

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blur', (evento) =>{
        valida(evento.target)
    })
})