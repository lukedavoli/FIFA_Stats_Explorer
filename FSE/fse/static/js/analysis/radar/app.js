const ui_rdr = new UI_rdr;
const requests_rdr = new Requests;

const players_search_rdr = document.getElementById('players-search-rdr');
const stats_selection_rdr = document.getElementById('stats-selection-rdr');
const player1_rdr = document.getElementById('player-search1-rdr');
const player2_rdr = document.getElementById('player-search2-rdr');
const player3_rdr = document.getElementById('player-search3-rdr');
const stat_boxes = [document.getElementById('stat1-select-rdr'),
                   document.getElementById('stat2-select-rdr'),
                   document.getElementById('stat3-select-rdr'),
                   document.getElementById('stat4-select-rdr'),
                   document.getElementById('stat5-select-rdr'),
                   document.getElementById('stat6-select-rdr'),
                   document.getElementById('stat7-select-rdr'),
                   document.getElementById('stat8-select-rdr'),
                   document.getElementById('stat9-select-rdr'),]


window.addEventListener('load', (e) => {
    stat_boxes[0].value = 'PAC';
    stat_boxes[1].value = 'DRI';
    stat_boxes[2].value = 'SHO';
    let p1 = JSON.parse(sessionStorage.getItem('rdrChartPlayer1'));
    let p2 = JSON.parse(sessionStorage.getItem('rdrChartPlayer2'));
    let p3 = JSON.parse(sessionStorage.getItem('rdrChartPlayer3'));
    player1_rdr.value = `${p1.info.type} ${p1.info.knownas}`;
    player2_rdr.value = `${p2.info.type} ${p2.info.knownas}`;
    player3_rdr.value = `${p3.info.type} ${p3.info.knownas}`;
    ui_rdr.updateChart_rdr(stat_boxes);
});


// On each keystroke get the players by name matching the search term and update the options
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
        }else if(e.target.id == 'player-search2-rdr'){
            sessionStorage.removeItem(`rdrChartPlayer2`);
        }else{
            sessionStorage.removeItem(`rdrChartPlayer3`);
        }
        ui_rdr.updateChart_rdr(stat_boxes);
    }
}

// Add the chosen player to the session storage and update the chart
players_search_rdr.addEventListener('select', playerChosen);
function playerChosen(e){
    const playerId = e.target.value;
    if(!isNaN(playerId)){
        requests_rdr.getPlayerById(playerId).then(data => {
            e.target.value = `${data.info.type} ${data.info.knownas}`;
            
            if(e.target.id == 'player-search1-rdr'){
                sessionStorage.setItem(`rdrChartPlayer1`, JSON.stringify(data));
            }else if(e.target.id == 'player-search2-rdr'){
                sessionStorage.setItem(`rdrChartPlayer2`, JSON.stringify(data));
            }else{
                sessionStorage.setItem(`rdrChartPlayer3`, JSON.stringify(data));
            }

            ui_rdr.updateChart_rdr(stat_boxes);
        });
    }
}

// Update the chart when the stat boxes lose focus or a new stat is selected
stats_selection_rdr.addEventListener('focusout', (e) => {
    ui_rdr.updateChart_rdr(stat_boxes);
});

stats_selection_rdr.addEventListener('select', (e) => {
    ui_rdr.updateChart_rdr(stat_boxes);
});