class UI{
    constructor(){
        this.dlPlayers = document.getElementById('players-list');
        this.barChartPlayers = document.getElementById('barChartPlayers')
    }

    updatePlayerOptions(players){
        
        this.dlPlayers.innerHTML = "";
        players.forEach((player) => {
            this.dlPlayers.innerHTML += 
                `<option value="${player.id}">${player.type} ${player.name} (${player.rating})</option>`
        });
    }

    emptyPlayerOptions(){
        this.dlPlayers.innerHTML = "";
    }

    clearField(field){
        field.value = "";
    }

    updateBarChartPlayers(){
        let players = JSON.parse(sessionStorage.getItem('barChartPlayers'));
        this.barChartPlayers.innerHTML = "";
        players.forEach((player) => {
            this.barChartPlayers.innerHTML +=
                `<li class="list-group-item">${player.info.knownas} (${player.info.rating})</li>`
        });   
    }
}