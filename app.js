const message = document.querySelector('.message');
const input = document.querySelector('.input');
const button = document.querySelector('.add');
const state = document.querySelector('.status');
const form = document.querySelector('.message__container');
const userLogin = prompt('Ваше имя: ');

const ws = new WebSocket('ws://localhost:3000');

let messageStorage = [];

function setStatus(value) {
    state.innerHTML = value;
};

function onSubmit(){
    if (!input.value) return;
    let messageBlock = {
        login: userLogin, 
        text: input.value
    };
    messageStorage.push(messageBlock);
    ws.send(JSON.stringify(messageBlock));
    input.value = '';
}

function addMessage(value) { 
    const { login, text } = JSON.parse(value) || {};
    let storageMessage = `<li>${login + ':'} ${text}</li>`;
    message.innerHTML += storageMessage;
    
    console.log(storageMessage)
};


button.addEventListener('click', onSubmit)


ws.onopen = () => setStatus('Online');
ws.onclose = () => setStatus('Disconnected');
ws.onmessage = (response) => {
    addMessage(response.data)
};