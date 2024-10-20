from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# Normal HTTP route
@app.route('/')
def index():
    return render_template('index.html')

# Another normal HTTP route
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from the server!'}
    return jsonify(data)

# Socket.IO event handlers
@socketio.on('connect')
def test_connect():
    print('Client connected')
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

@socketio.on('chat message')
def handle_message(message):
    print('Message: ' + message)
    emit('chat message', message, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)