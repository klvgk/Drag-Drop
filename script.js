//Função para automatizar a utilização do querySelector;
// function qS(seletor) {
//     return document.querySelector(seletor);
// };
//Mesma função simplificada com Arrow Function;
const qS = (seletor) => document.querySelector(seletor);

//Função para automatizar a utilização do querySelectorAll;
function qSA(seletor) {
    return document.querySelectorAll(seletor);
};
//Mesma função simplificada com Arrow Function;
//const qS = (seletor) => document.querySelector(seletor);

//Objeto das áreas;
let areas = {
    a: null,
    b: null,
    c: null
};

qSA('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

qSA('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

qS('.neutralArea').addEventListener('dragover', dragOverNeutral);
qS('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
qS('.neutralArea').addEventListener('drop', dropNeutral);

//Functions Item;
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
};

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

//Area Functions;
function dragOver(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        //Bloqueando o comportamento padrão que é Não poder largar itens arrastados;
        e.preventDefault();
        e.target.classList.add('hover');
    };
};

function dragLeave(e) {
    e.target.classList.remove('hover');
};

function drop(e) {
    e.target.classList.remove('hover');

    if (e.currentTarget.querySelector('.item') === null) {
        let dragItem = qS('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    } else {

    }
};

//Neutral Area Functions;
function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
};

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
};

function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = qS('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
};

//Logic Functions;
function updateAreas() {
    qSA('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });
    if (areas.a === '1' &&
        areas.b === '2' &&
        areas.c === '3') {
            qS('.areas').classList.add('correct');
    } else {
        qS('.areas').classList.remove('correct');
    }
};