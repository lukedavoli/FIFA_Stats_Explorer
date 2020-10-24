from flask import Flask, render_template, request, Response, json
import json
from scrape_fw import scrape_player

app = Flask(__name__)

SECRET_KEY = 'Wales.Golf.Madrid.'
app.config['SECRET_KEY'] = SECRET_KEY

##########################
### FRONT-END REQUESTS ###
##########################

@app.route('/', methods=['GET'])
def update():
    return render_template('index.html')


#########################
### BACK-END REQUESTS ###
#########################

@app.route('/add-player', methods=['POST'])
def add_player():
    request_data = request.json
    player = scrape_player(request_data['url'])
    response_data = json.dumps(player)
    response = Response(response_data, status=200, mimetype='application/json')
    return response


if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
