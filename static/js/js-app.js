// conectamos con el websocket tambien
const socket = io('http://127.0.0.1:8080');
socket.connect();
socket.emit('aws_status')
socket.on('aws_status_response', function (ret) {

    console.log(ret)
    // stopped
    if (ret == 'stopped') {

        console.log('stopped')
    }
    // stopping

    if (ret == 'stopping') {

        console.log('stopping')
    }
    // running
    if (ret == 'running') {

        console.log('running')
    }
    // pending
    if (ret == 'pending') {

        console.log('pending')
    }

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