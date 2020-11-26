class UI{
    constructor(){
        this.playersTableBody = document.getElementById('playersTable');
        this.requestStatus = document.getElementById('requestStatus');
    }

    // Update the user with the status of the request when adding a new player to the database
    updateRequestStatus(status){
        if(status === 'inprogress'){
            this.requestStatus.className = "inprogress";
            this.requestStatus.innerHTML = "Adding player to database...";
        }else if(status === 'failed'){
            this.requestStatus.className = "failed";
            this.requestStatus.innerHTML = "Failed to add player to database";
            setTimeout(this.clearStatus, 5000);
        }else if(status === 'complete'){
            this.requestStatus.className = "complete";
            this.requestStatus.innerHTML = "Player added to database!";
            setTimeout(this.clearStatus, 5000);
        }
    }

    // Clear the "adding player to database/player added to database" status label
    clearStatus(){
        this.requestStatus.innerHTML = "";
    }

    //Add players returned by request to the results table as table rows
    updatePlayersTable(players){
        this.playersTableBody.innerHTML = "";
        players.forEach((player) => {
            this.playersTableBody.innerHTML += 
                `<tr>
                    <th scope="row">${player.name}</th>
                    <td>${player.type}</td>
                    <td>${player.rating}</td>
                    <td>${player.position}</td>
                    <td>${player.club}</td>
                    <td>${player.country}</td>
                </tr>`
        });
    }
}