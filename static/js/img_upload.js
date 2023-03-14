const getBase64StringFromDataURL = (dataURL) =>
    dataURL.replace('data:', '').replace(/^.+,/, '');

function processSelectedImg(img){
    console.log("metodo process selected img")
    // Get the remote image as a Blob with the fetch API
    fetch(img.src)
        .then((res) => res.blob())
        .then((blob) => {
            // Read the Blob as DataURL using the FileReader API
            const reader = new FileReader();
            reader.onloadend = () => {
                    const base64 = getBase64StringFromDataURL(reader.result);
                    console.log('metodo process selected img')
                    console.log(base64);
               
                    $('#imgdisplay').hide(); // escondemos el display 
                    $('#spinner-div').show();//cargamos el spinner
                    $.ajax({
                        type:"POST", 
                        url: 'http://192.168.1.65:8080/process_real_img',
                        data: {
                             "img" : base64 
                              
                            } ,
                        success: function( img ){

                            console.log('------------- response -----------------')
                            
                           $('#spinner-div').hide();//quitamos el spipnnero porque ha finalizado la ejecucion
                            $('#imgdisplay').show();
                            document.getElementById('imgdisplay').src='data:image/jpeg;base64,'+img;
                        },
                        timeout: 15000,
                        error: function(  errorThrown ){
                            console.log( errorThrown );
                        }

                    });
               
            };
            reader.readAsDataURL(blob);
        });
}
