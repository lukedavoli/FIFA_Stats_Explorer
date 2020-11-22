class UI_rdr{
    constructor(){
        this.dlPlayers1_rdr = document.getElementById('players-list1-rdr');
        this.dlPlayers2_rdr = document.getElementById('players-list2-rdr');
    }

    updatePlayerOptions(element, players){
        let dl = null;
        if(element.id == 'player-search1-rdr'){
            dl = this.dlPlayers1_rdr;
        }else{
            dl = this.dlPlayers2_rdr;
        }
        dl.innerHTML = '';
        players.forEach((player) => {
            dl.innerHTML += 
                `<option value="${player.id}">${player.type} ${player.name} (${player.rating})</option>`
        });
    }

    updateChart_rdr(){

    }
}