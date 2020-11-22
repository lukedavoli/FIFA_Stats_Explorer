const ui_rdr = new UI_rdr;
const requests_rdr = new Requests;

const players_search_rdr = document.getElementById('players-search-rdr')
const player1_rdr = document.getElementById('player-search1-rdr');
const player2_rdr = document.getElementById('player-search2-rdr');
const stat1_rdr = document.getElementById('stat1-select-rdr');
const stat2_rdr = document.getElementById('stat2-select-rdr');
const stat3_rdr = document.getElementById('stat3-select-rdr');
const stat4_rdr = document.getElementById('stat4-select-rdr');
const stat5_rdr = document.getElementById('stat5-select-rdr');
const stat6_rdr = document.getElementById('stat6-select-rdr');
const stat7_rdr = document.getElementById('stat7-select-rdr');
const stat8_rdr = document.getElementById('stat8-select-rdr');
const stat9_rdr = document.getElementById('stat9-select-rdr');

window.addEventListener('load', (e) => {
    stat1_rdr.value = 'PAC';
    stat2_rdr.value = 'DRI';
    stat3_rdr.value = 'SHO';
    sessionStorage.removeItem(`rdrChartPlayer1`);
    sessionStorage.removeItem(`rdrChartPlayer2`);
    ui_rdr.updateChart_rdr();
});

players_search_rdr.addEventListener('keyup', searchPlayers);
function searchPlayers(e){
    const searchTerm = e.target.value;
    if(searchTerm && searchTerm.trim().length){
        requests_rdr.getPlayersByName(searchTerm).then(data => {
            ui_rdr.updatePlayerOptions(e.target, data);
        });
    }else{
        if(e.target.id == 'player-search1-rdr'){
            sessionStorage.removeItem(`rdrChartPlayer1`);
        }else{
            sessionStorage.removeItem(`rdrChartPlayer2`);
        }
    }
}

players_search_rdr.addEventListener('select', playerChosen);
function playerChosen(e){
    const playerId = e.target.value;
    if(!isNaN(playerId)){
        requests_rdr.getPlayerById(playerId).then(data => {
            ui_rdr.updateChart_rdr();
            e.target.value = `${data.info.type} ${data.info.knownas}`;
            
            if(e.target.id == 'player-search1-rdr'){
                sessionStorage.setItem(`rdrChartPlayer1`, JSON.stringify(data));
            }else{
                sessionStorage.setItem(`rdrChartPlayer2`, JSON.stringify(data));
            }
        });
    }
}