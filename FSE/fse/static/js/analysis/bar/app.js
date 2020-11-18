const ui_bar = new UI_bar;
const requests_bar = new Requests;

const chosenStat_bar = document.getElementById('stat-select-bar');
const playerSearch_bar = document.getElementById('player-search-bar');
const clearPlayers_bar = document.getElementById('clear-players-bar');
const axisToggle_bar = document.getElementById('axis-toggle-bar');

window.addEventListener('load', (e) => {
    ui_bar.updatePlayers_bar();
    chosenStat_bar.value = 'PAC';
    axisToggle_bar.checked = true;
    ui_bar.updateChart_bar(chosenStat_bar.value, axisToggle_bar.checked);
});


/*********************************
 - Search the database for players
 - Add player to current analysis
 *********************************/
playerSearch_bar.addEventListener('keyup', (e) => {
    const searchTerm = playerSearch_bar.value;
    if(searchTerm && searchTerm.trim().length){
        requests_bar.getPlayersByName(searchTerm).then(data => {
            ui_bar.updatePlayerOptions(data);
        });
    }else{
        ui_bar.emptyPlayerOptions();
    }
});

function addPlayerToBarSS(data){
    let existingPlayers = JSON.parse(sessionStorage.getItem(`barChartPlayers`));
    if(existingPlayers == null) existingPlayers = [];
    // Save allEntries back to local storage
    existingPlayers.push(data);
    sessionStorage.setItem(`barChartPlayers`, JSON.stringify(existingPlayers));
}

playerSearch_bar.addEventListener('select', (e) => {
    const playerId = playerSearch_bar.value;
    ui_bar.clearField(playerSearch_bar);
    let players = JSON.parse(sessionStorage.getItem('barChartPlayers'));
    if (players === null){
        players = [];
    }
    if(players.length < 8){
        requests_bar.getPlayerById(playerId).then(data => {
            addPlayerToBarSS(data);
            ui_bar.updatePlayers_bar();
            ui_bar.updateChart_bar(chosenStat_bar.value, axisToggle_bar.checked);
        });
    }else{
        ui_bar.displayMaxPlayersWarning();
    }
});


/*************************
 - Change chosen statistic
 *************************/
chosenStat_bar.addEventListener('input', (e) => {
    ui_bar.updateChart_bar(chosenStat_bar.value, axisToggle_bar.checked);
});


/****************************
 - Clear players in chart
 ***************************/
clearPlayers_bar.addEventListener('click', (e) => {
    sessionStorage.removeItem('barChartPlayers');
    ui_bar.updatePlayers_bar();
    ui_bar.updateChart_bar(chosenStat_bar.value, axisToggle_bar.checked);
});


/*******************
 - Toggle axis scale
 ******************/
axisToggle_bar.addEventListener('change', (e) => {
    ui_bar.updateChart_bar(chosenStat_bar.value, axisToggle_bar.checked)
});