# external imports
from flask import render_template, request, Response, json
import json
# internal imports
from fse import app
from fse import dao
from fse.scrape_fw import scrape_player


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
    dict_player = scrape_player(request_data['url'])
    dao.add_player(dict_player)
    response_data = json.dumps(dict_player)
    response = Response(response_data, status=200, mimetype='application/json')
    return response
