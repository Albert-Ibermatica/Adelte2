const delay = ms => new Promise(res => setTimeout(res, ms));
const cargandoModelo = async () => {
    await delay(40000);

    var elem = document.getElementById('servidorActivo')
    elem.innerText = "Servidor AWS: Cargando modelo TF ..."
    elem.style.color ="blue"

};

function stop_instances(){
    socket.connect()
    console.log("stop_instances clicked")
    socket.emit('stop_aws')
}
function start_instances(){
    socket.connect()
    console.log("start_instances clicked")
    socket.emit('run_aws')
    cargandoModelo();
}
