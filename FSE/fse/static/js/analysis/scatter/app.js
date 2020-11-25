const ui_sctr = new UI_sctr;
const requests_sctr = new Requests;

const chosenStatX_sctr = document.getElementById('statx-select-sctr');
const chosenStatY_sctr = document.getElementById('staty-select-sctr');
const playerSearch_sctr = document.getElementById('player-search-sctr');
const clearPlayers_sctr = document.getElementById('clear-players-sctr');
const axisToggle_sctr = document.getElementById('axis-toggle-sctr');

window.addEventListener('load', (e) => {
    ui_sctr.updatePlayers_sctr();
    chosenStatX_sctr.value = 'shot_power';
    chosenStatY_sctr.value = 'long_shots';
    axisToggle_sctr.checked = true;
    ui_sctr.updateChart_sctr(chosenStatX_sctr.value, chosenStatY_sctr.value, axisToggle_sctr.checked);
});

// Search the database for players
playerSearch_sctr.addEventListener('keyup', (e) => {
    const searchTerm = playerSearch_sctr.value;
    if(searchTerm && searchTerm.trim().length){
        requests_sctr.getPlayersByName(searchTerm).then(data => {
            ui_sctr.updatePlayerOptions(data);
        });
    }else{
        ui_sctr.emptyPlayerOptions();
    }
});

// Add players in the plot to session storage
function addPlayerToSctrSS(data){
    let existingPlayers = JSON.parse(sessionStorage.getItem(`sctrChartPlayers`));
    if(existingPlayers == null) existingPlayers = [];
    // Save allEntries back to local storage
    existingPlayers.push(data);
    sessionStorage.setItem(`sctrChartPlayers`, JSON.stringify(existingPlayers));
}

// Add chosen player from search dropdown to session storage and update graph
playerSearch_sctr.addEventListener('select', (e) => {
    const playerId = playerSearch_sctr.value;
    ui_sctr.clearField(playerSearch_sctr);
    let players = JSON.parse(sessionStorage.getItem('sctrChartPlayers'));
    if (players === null){
        players = [];
    }
    requests_sctr.getPlayerById(playerId).then(data => {
        addPlayerToSctrSS(data);
        ui_sctr.updatePlayers_sctr();
        ui_sctr.updateChart_sctr(chosenStatX_sctr.value, chosenStatY_sctr.value, axisToggle_sctr.checked);
    });
});

// Change the chosen statistic for the x-axis
chosenStatX_sctr.addEventListener('input', (e) => {
    ui_sctr.updateChart_sctr(chosenStatX_sctr.value, chosenStatY_sctr.value, axisToggle_sctr.checked);
});

// Change the chosen statistic for the y-axis
chosenStatY_sctr.addEventListener('input', (e) => {
    ui_sctr.updateChart_sctr(chosenStatX_sctr.value, chosenStatY_sctr.value, axisToggle_sctr.checked);
});

// Clear the players in the chart
clearPlayers_sctr.addEventListener('click', (e) => {
    sessionStorage.removeItem('sctrChartPlayers');
    ui_sctr.updatePlayers_sctr();
    ui_sctr.updateChart_sctr(chosenStatX_sctr.value, chosenStatY_sctr.value, axisToggle_sctr.checked);
});

// Toggle the axis scale
axisToggle_sctr.addEventListener('change', (e) => {
    ui_sctr.updateChart_sctr(chosenStatX_sctr.value, chosenStatY_sctr.value, axisToggle_sctr.checked);
});