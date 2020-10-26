from fse import db

class Player(db.Model):
    player_id = db.Column(db.Integer, nullable=False, unique=True, primary_key=True)
    i_card_name = db.Column(db.String(), nullable=False)
    i_full_name = db.Column(db.String(100), nullable=False)
    i_type = db.Column(db.String(60), nullable=False)
    i_knownas = db.Column(db.String(50), nullable=False)
    i_club = db.Column(db.String(60), nullable=False)
    i_league = db.Column(db.String(10), nullable=False)
    i_country = db.Column(db.String(60), nullable=False)
    i_position = db.Column(db.String(4), nullable=False)
    i_rating = db.Column(db.Integer, nullable=False)
    ss_DEF = db.Column(db.Integer, nullable=True)
    ss_DRI = db.Column(db.Integer, nullable=True)
    ss_PAC = db.Column(db.Integer, nullable=True)
    ss_PAS = db.Column(db.Integer, nullable=True)
    ss_PHY = db.Column(db.Integer, nullable=True)
    ss_SHO = db.Column(db.Integer, nullable=True)
    ss_DIV = db.Column(db.Integer, nullable=True)
    ss_HAN = db.Column(db.Integer, nullable=True)
    ss_KIC = db.Column(db.Integer, nullable=True)
    ss_REF = db.Column(db.Integer, nullable=True)
    ss_SPD = db.Column(db.Integer, nullable=True)
    ss_POS = db.Column(db.Integer, nullable=True)
    igs_acceleration = db.Column(db.Integer, nullable=False)
    igs_aggression = db.Column(db.Integer, nullable=False)
    igs_agility = db.Column(db.Integer, nullable=False)
    igs_balance = db.Column(db.Integer, nullable=False)
    igs_ball_control = db.Column(db.Integer, nullable=False)
    igs_composure = db.Column(db.Integer, nullable=False)
    igs_crossing = db.Column(db.Integer, nullable=False)
    igs_curve = db.Column(db.Integer, nullable=False)
    igs_defensive_awareness = db.Column(db.Integer, nullable=False)
    igs_dribbling = db.Column(db.Integer, nullable=False)
    igs_finishing = db.Column(db.Integer, nullable=False)
    igs_fk_accuracy = db.Column(db.Integer, nullable=False)
    igs_heading_accuracy = db.Column(db.Integer, nullable=False)
    igs_interceptions = db.Column(db.Integer, nullable=False)
    igs_jumping = db.Column(db.Integer, nullable=False)
    igs_long_pass = db.Column(db.Integer, nullable=False)
    igs_long_shots = db.Column(db.Integer, nullable=False)
    igs_penalties = db.Column(db.Integer, nullable=False)
    igs_positioning = db.Column(db.Integer, nullable=False)
    igs_reactions = db.Column(db.Integer, nullable=False)
    igs_short_pass = db.Column(db.Integer, nullable=False)
    igs_shot_power = db.Column(db.Integer, nullable=False)
    igs_slide_tackle = db.Column(db.Integer, nullable=False)
    igs_sprint_speed = db.Column(db.Integer, nullable=False)
    igs_stamina = db.Column(db.Integer, nullable=False)
    igs_stand_tackle = db.Column(db.Integer, nullable=False)
    igs_strength = db.Column(db.Integer, nullable=False)
    igs_vision = db.Column(db.Integer, nullable=False)
    igs_volleys = db.Column(db.Integer, nullable=False)
    
    def __repr__(self):
        return f"{self.i_card_name}({self.player_id})"

def add_player(json_player):
    new_player = json_to_dbobject(json_player)
    db.session.add(new_player)
    db.session.commit()
    json_player = dbobject_to_json(new_player)
    return json_player


def json_to_dbobject(p):
    new_player = Player(i_card_name=p['info']['card_name'],
                        i_full_name=p['info']['full_name'],
                        i_type=p['info']['type'],
                        i_club=p['info']['club'],
                        i_country=p['info']['country'],
                        i_knownas=p['info']['knownas'],
                        i_league=p['info']['league'],
                        i_position=p['info']['position'],
                        i_rating=p['info']['rating'],
                        igs_acceleration=p['stats_ingame']['acceleration'],
                        igs_aggression=p['stats_ingame']['aggression'],
                        igs_agility=p['stats_ingame']['agility'],
                        igs_balance=p['stats_ingame']['balance'],
                        igs_ball_control=p['stats_ingame']['ball_control'],
                        igs_composure=p['stats_ingame']['composure'],
                        igs_crossing=p['stats_ingame']['crossing'],
                        igs_curve=p['stats_ingame']['curve'],
                        igs_defensive_awareness=p['stats_ingame']['defensive_awareness'],
                        igs_dribbling=p['stats_ingame']['dribbling'],
                        igs_finishing=p['stats_ingame']['finishing'],
                        igs_fk_accuracy=p['stats_ingame']['fk_accuracy'],
                        igs_heading_accuracy=p['stats_ingame']['heading_accuracy'],
                        igs_interceptions=p['stats_ingame']['interceptions'],
                        igs_jumping=p['stats_ingame']['jumping'],
                        igs_long_pass=p['stats_ingame']['long_pass'],
                        igs_long_shots=p['stats_ingame']['long_shots'],
                        igs_penalties=p['stats_ingame']['penalties'],
                        igs_positioning=p['stats_ingame']['positioning'],
                        igs_reactions=p['stats_ingame']['reactions'],
                        igs_short_pass=p['stats_ingame']['short_pass'],
                        igs_shot_power=p['stats_ingame']['shot_power'],
                        igs_slide_tackle=p['stats_ingame']['slide_tackle'],
                        igs_sprint_speed=p['stats_ingame']['sprint_speed'],
                        igs_stamina=p['stats_ingame']['stamina'],
                        igs_stand_tackle=p['stats_ingame']['stand_tackle'],
                        igs_strength=p['stats_ingame']['strength'],
                        igs_vision=p['stats_ingame']['vision'],
                        igs_volleys=p['stats_ingame']['volleys'])
    
    if p['info']['position'] == 'GK':
        new_player.ss_DIV = p['stats_summary']['DIV']
        new_player.ss_HAN = p['stats_summary']['HAN']
        new_player.ss_KIC = p['stats_summary']['KIC']
        new_player.ss_REF = p['stats_summary']['REF']
        new_player.ss_SPD = p['stats_summary']['SPD']
        new_player.ss_POS = p['stats_summary']['POS']
    else:
        new_player.ss_DEF = p['stats_summary']['DEF']
        new_player.ss_DRI = p['stats_summary']['DRI']
        new_player.ss_PAC = p['stats_summary']['PAC']
        new_player.ss_PAS = p['stats_summary']['PAS']
        new_player.ss_PHY = p['stats_summary']['PHY']
        new_player.ss_SHO = p['stats_summary']['SHO']
    
    return new_player


def dbobject_to_json(p):
    j = {}
    j['player_id'] = p.player_id
    
    j['info'] = {}
    j['info']['full_name'] = p.i_full_name
    j['info']['type'] = p.i_type
    j['info']['country'] = p.i_country
    j['info']['club'] = p.i_club
    j['info']['league'] = p.i_league
    j['info']['knownas'] = p.i_knownas
    j['info']['rating'] = p.i_rating
    j['info']['position'] = p.i_position
    j['info']['card_name'] = p.i_card_name

    j['stats_summary'] = {}
    if j['info']['position'] == 'GK':
        j['stats_summary']['DIV'] = p.ss_DIV
        j['stats_summary']['HAN'] = p.ss_HAN
        j['stats_summary']['KIC'] = p.ss_KIC
        j['stats_summary']['REF'] = p.ss_REF
        j['stats_summary']['SPD'] = p.ss_SPD
        j['stats_summary']['POS'] = p.ss_POS
    else:
        j['stats_summary']['PAC'] = p.ss_PAC
        j['stats_summary']['SHO'] = p.ss_SHO
        j['stats_summary']['PAS'] = p.ss_PAS
        j['stats_summary']['DRI'] = p.ss_DRI
        j['stats_summary']['DEF'] = p.ss_DEF
        j['stats_summary']['PHY'] = p.ss_PHY
    
    j['stats_ingame'] = {}
    j['stats_ingame']['defensive_awareness'] = p.igs_defensive_awareness
    j['stats_ingame']['heading_accuracy'] = p.igs_heading_accuracy
    j['stats_ingame']['interceptions'] = p.igs_interceptions
    j['stats_ingame']['stand_tackle'] = p.igs_stand_tackle
    j['stats_ingame']['slide_tackle'] = p.igs_slide_tackle
    j['stats_ingame']['acceleration'] = p.igs_acceleration
    j['stats_ingame']['sprint_speed'] = p.igs_sprint_speed
    j['stats_ingame']['ball_control'] = p.igs_ball_control
    j['stats_ingame']['fk_accuracy'] = p.igs_fk_accuracy
    j['stats_ingame']['positioning'] = p.igs_positioning
    j['stats_ingame']['aggression'] = p.igs_aggression
    j['stats_ingame']['shot_power'] = p.igs_shot_power
    j['stats_ingame']['long_shots'] = p.igs_long_shots
    j['stats_ingame']['short_pass'] = p.igs_short_pass
    j['stats_ingame']['finishing'] = p.igs_finishing
    j['stats_ingame']['penalties'] = p.igs_penalties
    j['stats_ingame']['dribbling'] = p.igs_dribbling
    j['stats_ingame']['composure'] = p.igs_composure
    j['stats_ingame']['long_pass'] = p.igs_long_pass 
    j['stats_ingame']['reactions'] = p.igs_reactions
    j['stats_ingame']['crossing'] = p.igs_crossing
    j['stats_ingame']['strength'] = p.igs_strength
    j['stats_ingame']['agility'] = p.igs_agility
    j['stats_ingame']['balance'] = p.igs_balance
    j['stats_ingame']['volleys'] = p.igs_volleys
    j['stats_ingame']['jumping'] = p.igs_jumping
    j['stats_ingame']['stamina'] = p.igs_stamina
    j['stats_ingame']['vision'] = p.igs_vision
    j['stats_ingame']['curve'] = p.igs_curve
    
    return j
    