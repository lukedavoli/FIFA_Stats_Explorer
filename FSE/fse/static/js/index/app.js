const ui = new UI;
const requests = new Requests;

/****************************
 Add a player to the database
 ****************************/
const addPlayerForm = document.getElementById('addPlayerForm');
const urlField = document.getElementById('urlField');

addPlayerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    ui.updateRequestStatus('inprogress');
    const url_to_scrape = urlField.value;
    const request = {
        url: url_to_scrape
    }
    requests.addPlayer(request).then(response => {
        response.json().then(data => {
            console.log(data)
        })

        if(response.ok){
            ui.updateRequestStatus('complete');
        }else{
            ui.updateRequestStatus('failed');
        }
    });
});

/*******************************
 Search the database for players
 *******************************/
const dbSearchField = document.getElementById('dbSearch')

dbSearchField.addEventListener('keyup', (e) => {
    const searchTerm = dbSearchField.value;
    if(searchTerm && searchTerm.trim().length){
        requests.getPlayersByName(searchTerm).then(data => {
            ui.updatePlayersTable(data);
        });
    }
});