// conectamos con el websocket tambien
let isLoading = false; // variable que determina si esta cargando
const socket = io('http://127.0.0.1:8080');
socket.connect();
socket.emit('aws_status')
socket.on('aws_status_response', function (ret) {

    console.log(ret)
    // stopped
    if (ret == 'stopped') {
        var elem = document.getElementById('servidorActivo')
        elem.innerText = "Estado del servidor: Detenido"
        console.log('stopped')
    }
    // stopping
    if (ret == 'stopping') {
        var elem = document.getElementById('servidorActivo')
        elem.innerText = "Estado del servidor: Deteniendose..."
        console.log('stopping')
    }
    // running
    if (ret == 'running') {
        var elem = document.getElementById('servidorActivo')
        elem.innerText = "Estado del servidor: Arrancado"
        console.log('running')
    }
    // pending
    if (ret == 'pending') {
        var elem = document.getElementById('servidorActivo')
        elem.innerText = "Estado del servidor: Iniciándose"
        console.log('pending')
    }

})

var intervalId = window.setInterval(function(){
    socket.emit('aws_status')
}, 3000);

socket.on('connect_error',  function () {
//window.alert('conexion con el ws fallida')
console.log('fallo de conexion con el socket.')
})
socket.on('connect_failed',  function () {
//window.alert('conexion con el ws fallida')
console.log('fallo de conexion con el socket.')
})
socket.on('ec2_ready', function () {
//window.alert('Servidores AWS iniciados')
var elem = document.getElementById('servidorActivo')
elem.innerText = "Estado del servidor: Arrancado"
console.log('ec2 ready')
})
socket.on('ec2_stopped', function () {
//window.alert('Servidores AWS detenidos')
var elem = document.getElementById('servidorActivo')
elem.innerText = "Estado del servidor: Detenido"
console.log('ec2 stopped')
})

function openConnection() {
    socket.connect()
    socket.emit('openConnection');
    socket.emit('returnFrames')
}
socket.on('liveResponse', ({ img, frame }) => {
    var enc = new TextDecoder("utf-8");

    isLoading = true; // Marcar como cargando
    //document.getElementById('loading').style.display = 'block'; // Mostrar spinner

    //if (!img || !frame) {
        //document.getElementById('loadingMsg').textContent = 'Cargando...'; // Mostrar mensaje de carga
        //return;
    //}4

    document.getElementById('imgdisplay').src = 'data:image/jpeg;base64,' + img

    var base64frame = enc.decode(frame)

    document.getElementById('framedisplay').src = 'data:image/jpeg;base64,' + base64frame

    isLoading = false; // Marcar como no cargando
    //document.getElementById('loading').style.display = 'none'; // Ocultar spinner

    socket.emit('openConnection')
})
function closeConnection() {
    //window.alert('Deteniendo procesamiento de imagen')
    socket.emit('closeConnection');
    socket.disconnect();
}