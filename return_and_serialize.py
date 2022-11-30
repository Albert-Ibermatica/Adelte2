import os
import glob
import base64
import io
from PIL import Image


def capture_and_serialize():
    # limpiamos los json
    directory = "./processed_imgs"
    directorio = glob.glob('processed_imgs/*.jpeg')  # * solo coge los jpeg del directorio
    ultima_imagen = max(directorio, key=os.path.getctime)  # la serializamos en bytes base 64.
    with open(ultima_imagen, "rb") as image:
        i = image.read();
        imagenResul = bytearray(i)
    encoded_img = base64.b64encode(imagenResul)
    os.remove(ultima_imagen)  # la eliminamos una vez la devolvemos. sino se acumulan.

    return encoded_img

def capture_and_serialize_real():
    # limpiamos los json
    directorio = glob.glob('processed_plane_imgs/*.jpeg')  # * solo coge los jpeg del directorio
    ultima_imagen = max(directorio, key=os.path.getctime)  # la serializamos en bytes base 64.
    with open(ultima_imagen, "rb") as image:
        i = image.read();
        imagenResul = bytearray(i)
    print('----------------------------- IMAGEN RESUL -------------------------------')

    encoded_img = base64.b64encode(imagenResul)
    # os.remove(ultima_imagen)  # la eliminamos una vez la devolvemos. sino se acumulan.

    return encoded_img