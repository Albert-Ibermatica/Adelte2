from queue import LifoQueue
import multiprocessing
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
import os, time, json, requests, io, base64, ntpath
from PIL import Image
import numpy as np
import cv2, sys
# metodo upload para procesar la imagen:
savePath = "processed_imgs"
# la url hay que cambiarla por el servidor local aqui: LA URL DE MOMENTO CAMBIA CADA VEZ QUE SE ARRANCA LA INSTANCIA
# Y HAY DOS DISTINTAS UNA PARA AVIONES REALES Y OTRA PARA AVIONES LEGO. !!!!!!!!!
# ec2-3-95-157-129.compute-1.amazonaws.com

# esta url tiene que ser para los aviones de lego:::
url = 'http://ec2-35-168-65-141.compute-1.amazonaws.com:5000/segmentation'


def upload(image_file):
    try:
        start = time.time()
        basename = ntpath.basename(image_file).split(".")[0]
        
        image = Image.open(image_file)
        open_cv_image = np.array(image)
        resized = cv2.resize(open_cv_image, (512, 512))
        cv2.imwrite(image_file, resized)
        pil_image = Image.open(image_file)
        open_cv_image = np.array(pil_image)

        if len(open_cv_image.shape) == 2:
            backtorgb = cv2.cvtColor(open_cv_image, cv2.COLOR_GRAY2RGB)
            cv2.imwrite(image_file, backtorgb)
        prep = time.time()

        # Make API request
        my_img = {'image': open(image_file, 'rb')}
        data = {'filename': image_file, "savepath": "{}/{}.jpeg".format(savePath, basename)}

        r = requests.post(url, files=my_img, data=data)
        req_made = time.time()
        # Recive request answer:
        jsonResponse = r.json()

        imagenResul = base64.b64decode(jsonResponse['imageBytes'].encode('ascii'))
        image = Image.open(io.BytesIO(imagenResul))
        image.save('{}/{}_segmented.jpeg'.format(savePath, basename))

        saved = time.time()

        print("time for image {}: ".format(image_file), saved - start)

        return True

    except Exception as e:

        return False
