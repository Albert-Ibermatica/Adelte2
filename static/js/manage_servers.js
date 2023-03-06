
function stop_instances(){
    socket.connect()
    console.log("stop_instances clicked")
    socket.emit('stop_aws')
    closeConnection()
}
function start_instances(){
    socket.connect()
    console.log("start_instances clicked")
    socket.emit('run_aws')
    showSpinner();
    openConnection();
}

function showSpinner() {
    const spinnerPopup = document.getElementById("spinnerPopup");
    const loadingPercentage = document.getElementById("loadingPercentage");
    const loadingBar = document.getElementById("loadingBar");
    const loadingBarFill = document.createElement("div");
    loadingBarFill.id = "loadingBarFill";
    loadingBar.appendChild(loadingBarFill);
    spinnerPopup.style.display = "block";
    let percentage = 0;
    const intervalId = setInterval(function() {
      percentage += 1;
      if (percentage > 100) {
        clearInterval(intervalId);
        spinnerPopup.style.display = "none";
        window.alert("Servidor listo.")
        // llamar al metodo de empezar a recibir imagenes
      } else {
        loadingPercentage.textContent = `${percentage}%`;
        loadingBarFill.style.width = `${percentage}%`;
      }
    }, 600);
  }