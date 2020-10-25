# external imports
from flask import render_template, request, Response, json
import json
# internal imports
from fse import app
from fse.scrape_fw import scrape_player
from fse.models import Player

##########################
#### FRONT-END ROUTES ####
##########################

@app.route('/', methods=['GET'])
def update():
    return render_template('index.html')


#########################
#### REST API ROUTES ####
#########################

@app.route('/add-player', methods=['POST'])
def add_player():
    request_data = request.json
    player = scrape_player(request_data['url'])
    response_data = json.dumps(player)
    response = Response(response_data, status=200, mimetype='application/json')
    return response
