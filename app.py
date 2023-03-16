from flask import Flask, render_template
from flask_socketio import SocketIO
from engineio.payload import Payload
import base64
import stop_ec2_instances
import run_ec2_instances
import requests
import upload
# configuracion del servidor
http_server = Flask(__name__ , static_folder="static", template_folder="templates")
Payload.max_decode_packets = 500
http_server.config['CORS_HEADERS'] = 'Content-Type'
http_server.config['TEMPLATES_AUTO_RELOAD'] = True
websocket = SocketIO(http_server, cors_allowed_origins="*")

# metodos del servidor http
@http_server.route('/')
def inicio():
   return render_template('index.html')

@http_server.route('/livestream')
def livestreaming():
   return render_template('index.html')

@http_server.route('/img_processing')
def imgprocessing():
   return render_template('img_processing.html')
""" 
@http_server.route('/process_real_img', methods=['POST'])
def processRealImg():
        
    try:
        img_base64 = request.form['img']

        print(img_base64)

        img_bytes = base64.b64decode(img_base64)
        
        # Almacena temporalmente la imagen en formato de bytes utilizando BytesIO
        img_io = BytesIO(img_bytes)
        
        # Llama a la función "upload()" para procesar la imagen en formato de bytes y obtener la imagen procesada como bytes
        serialized_real_img = upload_real_photo.upload(img_io.getvalue())
        
        serialized_processed_img = base64.b64encode(serialized_real_img).decode('utf-8')
        print(serialized_processed_img)
        # Devuelve la imagen procesada como bytes
        return serialized_processed_img
    
    except Exception as e:  
        print(e) """
#metodos del websocket

@websocket.on('connect')
def test_connect():
    print('cliente conectado.')


@websocket.on('disconnect')
def test_connect():
    print('cliente desconectado.')


@websocket.on('run_aws')
def run_aws_ec2():
    print('run aws ec2')
    result = run_ec2_instances.run_instances()
    if result:
        websocket.emit('ec2_ready')
    print('instancias encendidas.')


@websocket.on('stop_aws')
def stop_aws_ec2():
    print('stop_aws')
    result = stop_ec2_instances.stop_instances()
    if result:
        websocket.emit('ec2_stopped')
    print('instancias detenidas.')


@websocket.on('aws_status')
def aws_status_check():
    print('aws_status')
    result = run_ec2_instances.check_status()
    if result:
        websocket.emit('aws_status_response', result)
    print('aws_staus')


@websocket.on('message')
def handle_message(data):
    print('received message: ' + str(data))


@websocket.on('openConnection')
def open_connection():
        try:
            print('transferencia iniciada')

            # captura y graba una imagen en el directorio:  unprocessed_imgs/captura_camara.jpeg 
            # llama al metodo upload y guarda lo que devuelve a /processed_imgs
            r = requests.get('http://192.168.100.71:6688/snapshot/PROFILE_000')
            file = open("unprocessed_imgs/captura_camara.jpeg", "wb")
            file.write(r.content)
            file.close()
            
            base64_img= upload.upload('unprocessed_imgs/captura_camara.jpeg') 
            # cogemos un fotograma para mandar a la web el de la izquierda 
            
            # serializamos a base64 el fotograma para mandarlo en el emit del websocket
            frame_base64 = base64.b64encode(r.content)

            # capturamos la ultima imagen del directorio y la serializamos
            #base64_img = return_and_serialize.capture_and_serialize()
            
            # emitimos las 2 imagenes
            websocket.emit('liveResponse', {'img': base64_img, 'frame': frame_base64})
        except Exception as e:
            print(f'Error: {e}')
    

    



if __name__ == '__main__':
   websocket.run(http_server, host="0.0.0.0", port=8080)