const ui = new UI;
const requests = new Requests;

const chosenStatBar = document.getElementById('chosen-stat-bar');
const dbSearchField = document.getElementById('addPlayersSearch');
const btnClearPlayers = document.getElementById('btnClearPlayers');
const cbxToggleAxis = document.getElementById('cbxAxisToggle');

window.addEventListener('load', (e) => {
    ui.updateBarChartPlayers();
    chosenStatBar.value = 'PAC';
    cbxToggleAxis.checked = true;
    ui.updateBarChart(chosenStatBar.value, cbxToggleAxis.checked);
});


/*********************************
 - Search the database for players
 - Add player to current analysis
 *********************************/
dbSearchField.addEventListener('keyup', (e) => {
    const searchTerm = dbSearchField.value;
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

dbSearchField.addEventListener('select', (e) => {
    const playerId = dbSearchField.value;
    ui.clearField(dbSearchField);
    requests.getPlayerById(playerId).then(data => {
        addPlayerToSS("bar", data);
        ui.updateBarChartPlayers();
        ui.updateBarChart(chosenStatBar.value, cbxToggleAxis.checked);
    })
});


/*************************
 - Change chosen statistic
 *************************/
chosenStatBar.addEventListener('input', (e) => {
    ui.updateBarChart(chosenStatBar.value, cbxToggleAxis.checked);
});


/****************************
 - Clear players in bar chart
 ***************************/
btnClearPlayers.addEventListener('click', (e) => {
    sessionStorage.removeItem('barChartPlayers');
    ui.updateBarChartPlayers();
    ui.updateBarChart(chosenStatBar.value, cbxToggleAxis.checked);
});


/*******************
 - Toggle axis scale
 ******************/
cbxToggleAxis.addEventListener('change', (e) => {
    ui.updateBarChart(chosenStatBar.value, cbxToggleAxis.checked)
});