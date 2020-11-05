# external imports
from flask import render_template, request, Response, json
import json
import traceback
# internal imports
from fse import app
from fse import dao
from fse.scrape_fw import scrape_player

##########################
#### FRONT-END ROUTES ####
##########################

"""Index page

Returns:
    render template: index.html is rendered in the browser
"""
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


"""Analysis page

Returns:
    render template: analysis.html is rendered in the browser
"""
@app.route('/analysis', methods=['GET'])
def analysis():
    return render_template('analysis.html')


#########################
#### REST API ROUTES ####
#########################

"""Endpoint for adding a new player to the database

Returns:
    JSON: Returns the JSON object with details of the Player added to the
    database as well as the Player_id assigned to it
"""
@app.route('/add-player', methods=['POST'])
def add_player():
    request_data = request.json
    try:
        dict_player = scrape_player(request_data['url'])
        status = 200
        player_created = dao.add_player(dict_player)
        response_data = json.dumps(player_created)
    except AttributeError:
        status = 500
        response_data = ("An unexpected error occurred while collecting the data,"
                        " no player was added to the database.")
        print(traceback.format_exc())
    response = Response(response_data, status=status, mimetype='application/json')
    return response


"""Endpoint for getting players from the database by name

Returns:
    JSON: Resturns a JSON object with short summary info on all players
    with a name like the search term
"""
@app.route('/players/name/<string:name>', methods=['GET'])
def get_players_by_name(name):
    players = dao.get_players_by_name(name)
    response_data = json.dumps(players)
    response = Response(response_data, status=200, mimetype='application/json')
    return response


"""Endpoint for getting a player by their id

Returns:
    JSON: Returns the player as a JSON object
"""
@app.route('/players/id/<player_id>', methods=['GET'])
def get_player_by_id(player_id):
    player = dao.get_player_by_id(player_id)
    response_data = json.dumps(player)
    response = Response(response_data, status=200, mimetype='application/json')
    return response


