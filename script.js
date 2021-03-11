var socket = io();
var nam
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

if(localStorage.getItem('name') === null){
    nam = prompt("What is your name");
    localStorage.setItem('name', nam);
    var Alert = `${nam} : is connected`;
    socket.emit('connection',Alert );
}

socket.on('connection', function(Alert){
    var item = document.createElement('li');
    item.textContent = Alert;
    messages.appendChild(item);
    window.scrollTo(0,document.body.scrollingHeight);
})

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(input.value) {
      let name = localStorage.getItem('name');
      var msg = input.value 
      input.value = `${name}: ${msg}`;
        socket.emit('chat message', input.value);
        input.value = '';
    }
} );

socket.on('chat message', function(msg){
    var item = document.createElement('li');  
    item.textContent = msg;  
    messages.appendChild(item);
    console.log("SECOND LOOP")
    window.scrollTo(0,document.body.scrollingHeight);
});


