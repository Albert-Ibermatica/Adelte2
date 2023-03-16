hardcodeProcessedImg();
function hardcodeProcessedImg(){
    var imgGrid = document.querySelectorAll('.img_table');
for (var i = 0; i < imgGrid.length; i++) {
  imgGrid[i].addEventListener('click', function(event) {
    var id = event.target.id;
    var imgDisplay = document.getElementById('imgdisplay');
    setTimeout(function() {
        switch (id) {
            case "1":
              imgDisplay.src = "/static/processed_plane_imgs/sample_segmented.jpeg";
              break;
            case "2":
              imgDisplay.src = "/static/processed_plane_imgs/sample2_segmented.jpeg";
              break;
            case "3":
              imgDisplay.src = "/static/processed_plane_imgs/sample3_segmented.jpeg";
              break;
            case "4":
              imgDisplay.src = "/static/processed_plane_imgs/sample4_segmented.jpeg";
              break;
            case "5":
              imgDisplay.src = "/static/processed_plane_imgs/sample5_segmented.jpeg";
              break;
            case "6":
              imgDisplay.src = "/static/processed_plane_imgs/sample6_segmented.jpeg";
              break;
            case "7":
              imgDisplay.src = "/static/processed_plane_imgs/sample7_segmented.jpeg"
              break;
            case "8":
              imgDisplay.src = "/static/processed_plane_imgs/sample8_segmented.jpeg"
              break;
            case "9":
              imgDisplay.src = "/static/processed_plane_imgs/sample9_segmented.jpeg"
              break;
            case "10":
              imgDisplay.src = "/static/processed_plane_imgs/sample10_segmented.jpeg"
              break;
            case "11":
              imgDisplay.src = "/static/processed_plane_imgs/sample11_segmented.jpeg"
              break;
            case "12":
              imgDisplay.src = "/static/processed_plane_imgs/sample1_segmented.jpeg";
              break;
            default:
              // Si la id no coincide con ninguna imagen conocida, no se muestra ninguna imagen
              imgDisplay.src = "";
          }
    },3000)
   
  });
}
}

//var TargetImg;
//addListeners();
/* function addListeners() {
    const imgs = document.querySelectorAll('.img_table--item');
    imgs.forEach(img => {

        var imagen = img;

        //img.setAttribute("title", "Click Izquierdo para procesar imagen, clic derecho para seleccionar una nueva imagen");

        img.addEventListener('click', function handleClick(event) {

            if (event.button == 0) {

                console.log('imgclicked', event);
                var imgAttribute = img.getAttribute('src')
                console.log(imgAttribute)
                //processSelectedImg(img)
                console.log(img)
                hardcodeProcessedImg(img.id)
            }
        });
        img.addEventListener('contextmenu', function (e) {
            eventTarget = e;
            e.preventDefault();
            TargetImg = img;
            console.log('rightclick')
            var menu = document.createElement("div")
            menu.id = "contextMenu"
            menu.style = `top:${e.pageY - 10}px;left:${e.pageX - 40}px`
            menu.onmouseleave = () => contextMenu.outerHTML = ''
            menu.innerHTML = "<p style='font-size: 23px'  onclick='loadImgUrl()'>Sube imagen con URL</p>" +
                "<p style='font-size: 23px' onclick='loadImgFile()'>Sube archivo de imagen</p>" +
                "<p style='font-size: 23px' onclick='deleteImg()'>Elimina imagen</p>"
            document.body.appendChild(menu)

            return false;
        }, false);
    });

}
function loadImgUrl() {

    console.log(TargetImg);
    // metemos la url de la imagen y la reemplazamos por la que tiene
    var antiguoSrc = TargetImg.src;
    var result = window.prompt('URL:')
    if (result != null) {
        TargetImg.src = result;
    } else {
        TargetImg.src = antiguoSrc;
    }
}

async function loadImgFile() {
    console.log(TargetImg)
    var input = document.createElement('input');
    input.id = 'fileupload';
    input.type = 'file';
    input.onchange = e => {

        var file = e.target.files[0];
        var form_data = new FormData();
        form_data.append('file', file);
        //alert(form_data);
        $.ajax({
            url: 'mvfile.php', // <-- apuntamos al sccript de php que mueve el archivo
            dataType: 'text',  // <-- texto que se espera de vuelta
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            error: function () {
                window.alert('no se ha podido conectar con el servidor')
            },
            success: function (php_script_response) {
                // alert(php_script_response); // <-- display response from the PHP script, if any
                TargetImg.src = php_script_response;
            },
            timeout: 10000
        }).then(function () {

        }).catch(function (e) {
            if (e.statusText == 'timeout') {

                window.alert('timeout: no se ha podido conectar con el servidor papafrita')

            }
        });

    }
    input.click();
}
function deleteImg() {

    TargetImg.src = null;

}
function hardcodeProcessedImg(id_img){
    
    switch (id_img) {
        case "1":
            console.log("Opción 1 seleccionada");
            var img = document.getElementById('imgdisplay');
            img.src = "{{ url_for('static', filename='sample_images/sample.jpg') }}";
          
        case "2":
          console.log("Opción 2 seleccionada");
          document.getElementById('imgdisplay').src="{{url_for('static',filename='sample_images/sample.jpg')}}";
          break;
        case "3":
          console.log("Opción 3 seleccionada");
          break;
        case 4:
          console.log("Opción 4 seleccionada");
          break;
        case 5:
          console.log("Opción 5 seleccionada");
          break;
        case 6:
          console.log("Opción 6 seleccionada");
          break;
        case 7:
          console.log("Opción 7 seleccionada");
          break;
        case 8:
          console.log("Opción 8 seleccionada");
          break;
        case 9:
          console.log("Opción 9 seleccionada");
          break;
        case 10:
          console.log("Opción 10 seleccionada");
          break;
        case 11:
          console.log("Opción 11 seleccionada");
          break;
        case 12:
          console.log("Opción 12 seleccionada");
          break;
        default:
            console.log("default");
          break;
      }
} */
