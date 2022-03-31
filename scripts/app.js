// variables y selectores
const presupuesto = document.querySelector("#presupuesto");
const restante = document.querySelector("#restante");

const gastoInput = document.querySelector("#gasto");
const cantidadInput = document.querySelector("#cantidad");

const button = document.querySelector(".send");
const lista = document.querySelector("#lista");

let arrayLista = [];
let saldoGlobal;
let saldoFijo;

// event listeners
eventListeners();
function eventListeners() {
    document.addEventListener("DOMContentLoaded", preguntarSaldo);
    button.addEventListener("click", imprimirRestante);
};

// funciones
function preguntarSaldo() {
    const saldoPrompt = parseInt(prompt("¿Cual es tu presupuesto?"));

    if(saldoPrompt <= 0 || isNaN(saldoPrompt)) {
        preguntarSaldo();
    } else {    
        saldoGlobal = saldoPrompt;
        saldoFijo = saldoPrompt;
        imprimirSaldo(saldoPrompt);
    }

};

function imprimirSaldo(s) {
    presupuesto.innerHTML = `Presupuesto $${s}`;
    restante.innerHTML = `Restante $${s}`;

};

function imprimirRestante(e) {

    console.log();

    if(isNaN(cantidadInput.value)) {
        alert("Solo se aceptan valores numericos en este campo");
    } else if(cantidadInput.value.length >= 20) {
        alert("Maximo 20 digitos");
    } else if(gastoInput.value === "" || cantidadInput.value === "") {
        alert("Debe completar todos los campos");
    } else if(detectarEspacios(cantidadInput.value) || detectarEspacios(gastoInput.value)) {
        alert("No se aceptan los valores en blanco");
    } else {
        saldoGlobal -= cantidadInput.value;

        actualizarRestante();

        if(e.target.classList.contains("send")) {
            crearLista()
        }
    }

};

function detectarEspacios(str) {
    return str.trim().length === 0;
};

function crearLista() {
    const cantidad = parseInt(cantidadInput.value);
    const gasto = gastoInput.value;
 
    const obj = {
        gasto: gasto,
        cantidad: cantidad,
        id: uuid.v4(),
        }
    
    arrayLista.push(obj);
    
    imprimirLista();


};

function imprimirLista() {
    actualizaLista()
    if(arrayLista.length > 0) {
        arrayLista.forEach( (obj) => {
            const div = document.createElement("div");
            const gastoHTML = document.createElement("p");
            const cantidadHTML = document.createElement("p");
            const btn = document.createElement("button");
            div.classList.add("container-g-c");

            cantidadHTML.classList.add("cantidad");
            gastoHTML.innerHTML = `${obj.gasto}`;
            cantidadHTML.innerHTML = `${obj.cantidad}`;

            btn.innerHTML = "Borrar";

            btn.onclick = () => {
                btnBorrar(obj.id,obj.cantidad);
              };
            
            div.appendChild(gastoHTML);
            div.appendChild(cantidadHTML);
            div.appendChild(btn);
            lista.appendChild(div);
        });
    }
    
};

function btnBorrar(id,cantidad) {
    arrayLista = arrayLista.filter( ( test ) => test.id !== id);

    saldoGlobal += parseInt(cantidad);
    
    actualizarRestante();
    actualizaLista();
    imprimirLista();
};

function actualizaLista() {
    lista.innerHTML = "";
};

function actualizarRestante() {
    restante.innerHTML = `Restante $${saldoGlobal}`;
    if(saldoGlobal <= 0) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }

    if(saldoGlobal >= (saldoFijo * 60)/100) {
        restante.style.backgroundColor = "#00800085"; 
    }
    if(saldoGlobal <= (saldoFijo * 50)/100) {
        restante.style.backgroundColor = "#ffee008a";
    }
    if(saldoGlobal <= (saldoFijo * 25)/100) {
        restante.style.backgroundColor = "#ff88008a";
    } 
    if(saldoGlobal <= (saldoFijo * 10)/100) {
        restante.style.backgroundColor = "#ff00008a";
    }


};