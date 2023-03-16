/* var TargetImg;
//addListeners();
function addListeners() {

    const imgs = document.querySelectorAll('.imgGrid');
    imgs.forEach(img => {

        var imagen = img;

        img.setAttribute("title", "Click Izquierdo para procesar imagen, clic derecho para seleccionar una nueva imagen");

        img.addEventListener('click', function handleClick(event) {

            if (event.button == 0) {

                console.log('imgclicked', event);
                var imgAttribute = img.getAttribute('src')
                console.log(imgAttribute)
                processSelectedImg(img)

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

} */