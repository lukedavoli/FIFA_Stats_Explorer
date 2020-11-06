const ui = new UI;
const requests = new Requests;

const chosenStat_bar = document.getElementById('chosen-stat-bar');
const playerSearch_bar = document.getElementById('player-search-bar');
const clearPlayers_bar = document.getElementById('clear-players-bar');
const axisToggle_bar = document.getElementById('axis-toggle-bar');

window.addEventListener('load', (e) => {
    ui.updatePlayers_bar();
    chosenStat_bar.value = 'PAC';
    axisToggle_bar.checked = true;
    ui.updateChart_bar(chosenStat_bar.value, axisToggle_bar.checked);
});


/*********************************
 - Search the database for players
 - Add player to current analysis
 *********************************/
playerSearch_bar.addEventListener('keyup', (e) => {
    const searchTerm = playerSearch_bar.value;
    if(searchTerm && searchTerm.trim().length){
        requests.getPlayersByName(searchTerm).then(data => {
            ui.updatePlayerOptions(data);
        });
    }else{
        ui.emptyPlayerOptions();
    }
});

function addPlayerToSS(chart, data){
    let existingPlayers = JSON.parse(sessionStorage.getItem(`${chart}ChartPlayers`));
    if(existingPlayers == null) existingPlayers = [];
    // Save allEntries back to local storage
    existingPlayers.push(data);
    sessionStorage.setItem(`${chart}ChartPlayers`, JSON.stringify(existingPlayers));
}

playerSearch_bar.addEventListener('select', (e) => {
    const playerId = playerSearch_bar.value;
    ui.clearField(playerSearch_bar);
    let players = JSON.parse(sessionStorage.getItem('barChartPlayers'));
    if (players === null){
        players = [];
    }
    if(players.length < 8){
        requests.getPlayerById(playerId).then(data => {
            addPlayerToSS("bar", data);
            ui.updatePlayers_bar();
            ui.updateChart_bar(chosenStat_bar.value, axisToggle_bar.checked);
        });
    }else{
        ui.displayMaxPlayersWarning();
    }
});


/*************************
 - Change chosen statistic
 *************************/
chosenStat_bar.addEventListener('input', (e) => {
    ui.updateChart_bar(chosenStat_bar.value, axisToggle_bar.checked);
});


/****************************
 - Clear players in bar chart
 ***************************/
clearPlayers_bar.addEventListener('click', (e) => {
    sessionStorage.removeItem('barChartPlayers');
    ui.updatePlayers_bar();
    ui.updateChart_bar(chosenStat_bar.value, axisToggle_bar.checked);
});


/*******************
 - Toggle axis scale
 ******************/
axisToggle_bar.addEventListener('change', (e) => {
    ui.updateChart_bar(chosenStat_bar.value, axisToggle_bar.checked)
});