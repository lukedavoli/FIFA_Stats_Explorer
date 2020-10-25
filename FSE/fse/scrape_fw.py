from bs4 import BeautifulSoup
import requests
from pprint import pprint

def scrape_player(url):
    player = {}

    page = requests.get(url).text
    soup = BeautifulSoup(page, 'html.parser')

    player['info'] = {}

    profile_p1 = soup.find('div', {'class': 'playerprofile-hbar-ttl'})
    player['info']['full_name'] = profile_p1.h1.text
    info = profile_p1.div.text.split(' | ')
    player['info']['type'] = info[0]
    player['info']['country'] = info[1]
    player['info']['club'] = info[2]
    player['info']['league'] = info[3]
    
    player['info']['knownas'] = soup.find('div', {'class': 'card-21-name'}).text
    player['info']['rating'] = soup.find('div', {'class': 'card-21-rating'}).text
    player['info']['position'] = soup.find('div', {'class': 'card-21-position'}).text

    if player['info']['type'] == 'Non-Inform':
        player['info']['card_name'] = player['info']['knownas']
    else:
        player['info']['card_name'] = f"{player['info']['type']} {player['info']['knownas']}"


    stats = soup.find('div', {'class': 'playerprofile-stats-data'})
    player['stats_summary'] = {}
    if player['info']['position'] == 'GK':
        player['stats_summary']['DIV'] = stats.find('div', {'class': 'att1bar'}).text
        player['stats_summary']['HAN'] = stats.find('div', {'class': 'att2bar'}).text
        player['stats_summary']['KIC'] = stats.find('div', {'class': 'att3bar'}).text
        player['stats_summary']['REF'] = stats.find('div', {'class': 'att4bar'}).text
        player['stats_summary']['SPD'] = stats.find('div', {'class': 'att5bar'}).text
        player['stats_summary']['POS'] = stats.find('div', {'class': 'att6bar'}).text
    else:
        player['stats_summary']['PAC'] = stats.find('div', {'class': 'att1bar'}).text
        player['stats_summary']['SHO'] = stats.find('div', {'class': 'att2bar'}).text
        player['stats_summary']['PAS'] = stats.find('div', {'class': 'att3bar'}).text
        player['stats_summary']['DRI'] = stats.find('div', {'class': 'att4bar'}).text
        player['stats_summary']['DEF'] = stats.find('div', {'class': 'att5bar'}).text
        player['stats_summary']['PHY'] = stats.find('div', {'class': 'att6bar'}).text

    # I recognise that this looks lazy but for the sake of consistency in the 
    # naming convention of the dictionary keys this was the best approach
    player['stats_ingame'] = {}
    player['stats_ingame']['acceleration'] = stats.find('div', {'class': 'accelerationstat'}).text
    player['stats_ingame']['sprint_speed'] = stats.find('div', {'class': 'sprintspeedstat'}).text
    player['stats_ingame']['positioning'] = stats.find('div', {'class': 'positioningstat'}).text
    player['stats_ingame']['finishing'] = stats.find('div', {'class': 'finishingstat'}).text
    player['stats_ingame']['shot_power'] = stats.find('div', {'class': 'shotpowerstat'}).text
    player['stats_ingame']['long_shots'] = stats.find('div', {'class': 'longshotstat'}).text
    player['stats_ingame']['volleys'] = stats.find('div', {'class': 'volleysstat'}).text
    player['stats_ingame']['penalties'] = stats.find('div', {'class': 'penaltiesstat'}).text
    player['stats_ingame']['vision'] = stats.find('div', {'class': 'visionstat'}).text
    player['stats_ingame']['crossing'] = stats.find('div', {'class': 'crossingstat'}).text
    player['stats_ingame']['fk_accuracy'] = stats.find('div', {'class': 'fkaccstat'}).text
    player['stats_ingame']['short_pass'] = stats.find('div', {'class': 'shortpassstat'}).text
    player['stats_ingame']['long_pass'] = stats.find('div', {'class': 'longpassstat'}).text
    player['stats_ingame']['curve'] = stats.find('div', {'class': 'curvestat'}).text
    player['stats_ingame']['agility'] = stats.find('div', {'class': 'agilitystat'}).text
    player['stats_ingame']['balance'] = stats.find('div', {'class': 'balancestat'}).text
    player['stats_ingame']['reactions'] = stats.find('div', {'class': 'reactionsstat'}).text
    player['stats_ingame']['ball_control'] = stats.find('div', {'class': 'ballcontrolstat'}).text
    player['stats_ingame']['dribbling'] = stats.find('div', {'class': 'dribblingstat'}).text
    player['stats_ingame']['composure'] = stats.find('div', {'class': 'composurestat'}).text
    player['stats_ingame']['interceptions'] = stats.find('div', {'class': 'tactawarestat'}).text
    player['stats_ingame']['heading_accuracy'] = stats.find('div', {'class': 'headingaccstat'}).text
    player['stats_ingame']['defensive_awareness'] = stats.find('div', {'class': 'markingstat'}).text
    player['stats_ingame']['stand_tackle'] = stats.find('div', {'class': 'standingtacklestat'}).text
    player['stats_ingame']['slide_tackle'] = stats.find('div', {'class': 'slidetacklestat'}).text
    player['stats_ingame']['jumping'] = stats.find('div', {'class': 'jumpingstat'}).text
    player['stats_ingame']['stamina'] = stats.find('div', {'class': 'staminastat'}).text
    player['stats_ingame']['strength'] = stats.find('div', {'class': 'strengthstat'}).text
    player['stats_ingame']['aggression'] = stats.find('div', {'class': 'aggressionstat'}).text

    return player


if __name__ == '__main__':
    url = input("enter url: ")
    player = scrape_player(url)
    pprint(player)