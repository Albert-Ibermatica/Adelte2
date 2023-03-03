window.onload = currentTime;
function currentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    if (hh == 0) {
        hh = 12;
    }
    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;
    let time = hh + ":" + mm + ":" + ss;
    document.getElementById("watch").innerText = time;
    let t = setTimeout(function () { currentTime() }, 1000);
}
// conectamos con el websocket tambien
const socket = io('http://127.0.0.1:8080');
socket.connect();
socket.emit('aws_status')
socket.on('aws_status_response', function (ret) {

    console.log(ret)
    // stopped
    if (ret == 'stopped') {
        var elem = document.getElementById('servidorActivo')
        elem.innerText = "Servidor AWS: Detenido"
        elem.style.color = "red"
    }
    // stopping

    if (ret == 'stopping') {

        var elem = document.getElementById('servidorActivo')
        elem.innerText = "Servidor AWS: Deteniendo ..."
        elem.style.color = "yellow"

    }
    // running
    if (ret == 'running') {
        var elem = document.getElementById('servidorActivo')
        elem.innerText = "Servidor AWS: Activo"
        elem.style.color = "green"
    }
    // pending
    if (ret == 'pending') {
        var elem = document.getElementById('servidorActivo')
        elem.innerText = "Servidor AWS: Iniciando ..."
        elem.style.color = "blue"
    }

})


var intervalId = window.setInterval(function () {
    socket.emit('aws_status')
}, 5000);

socket.on('connect_error', function () {
    //window.alert('conexion con el ws fallida')
    console.log('conexion con el websocket fallida, el websocket no esta arrancado')
})
socket.on('connect_failed', function () {
    //window.alert('conexion con el ws fallida')
    console.log('conexion con el websocket fallida, el websocket no esta arrancado')
})
socket.on('ec2_ready', function () {
    window.alert('Servidores AWS iniciados')
    var elem = document.getElementById('servidorActivo')
    elem.innerText = "Servidor AWS: Activo"
    elem.style.color = "green"
    console.log('ec2 ready')
})
socket.on('ec2_stopped', function () {
    window.alert('Servidores AWS detenidos')
    var elem = document.getElementById('servidorActivo')
    elem.innerText = "Servidor AWS: Detenido"
    elem.style.color = "red"
    console.log('ec2 stopped')
})

function openConnection() {
    window.alert('Iniciado procesamiento de imagen')
    var stopButton = document.getElementById('stopButton')
    stopButton.disabled = false;
    var startButton = document.getElementById('startButton')
    startButton.disabled = true;
    socket.connect()
    socket.emit('openConnection');
    socket.emit('returnFrames')
}
socket.on('liveResponse', ({ img, frame }) => {
    var enc = new TextDecoder("utf-8");
    // el ret es un json con el fotograma y la imagen procesada.
    //console.log("------------ESTO ES LA VARIABLE RET ::")
    //console.log(ret)
    //console.log("ret.img")
    //console.log(img)
    //console.log("ret.frame")
    //console.log(frame)
    //console.log(base64img)
    //console.log('data:image/jpeg;base64,'+base64img)

    document.getElementById('imgdisplay').src = 'data:image/jpeg;base64,' + img

    var base64frame = enc.decode(frame)
    document.getElementById('framedisplay').src = 'data:image/jpeg;base64,' + base64frame

    socket.emit('openConnection')
})
function closeConnection() {
    window.alert('Deteniendo procesamiento de imagen')
    var stopButton = document.getElementById('stopButton')
    stopButton.disabled = true;
    var startButton = document.getElementById('startButton')
    startButton.disabled = false;

    socket.emit('closeConnection');
    socket.disconnect();
}