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
                    
            
                   // document.getElementById('imgdisplay').src='data:image/jpeg;base64,'+base64;
            };
            reader.readAsDataURL(blob);
        });
}
