const ui = new UI;
const requests = new Requests;

/*********************************
 - Search the database for players
 - Add player to current analysis
 *********************************/
const dbSearchField = document.getElementById('addPlayersSearch')

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

dbSearchField.addEventListener('select', (e) => {
    const playerId = dbSearchField.value;
    ui.clearField(dbSearchField);
    requests.getPlayerById(playerId).then(data => {
        addPlayerToSS("bar", data);
        ui.updateBarChartPlayers();
    })
});

function addPlayerToSS(chart, data){
    let existingPlayers = JSON.parse(sessionStorage.getItem(`${chart}ChartPlayers`));
    if(existingPlayers == null) existingPlayers = [];
    // Save allEntries back to local storage
    existingPlayers.push(data);
    sessionStorage.setItem(`${chart}ChartPlayers`, JSON.stringify(existingPlayers));
}
