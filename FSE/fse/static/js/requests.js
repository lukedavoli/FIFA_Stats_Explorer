class Requests{
    /************************************************
     * POST a URL to the backend to be scraped for  *
     * player information and added to the database *
     ************************************************/
    async addPlayer(request){
        const response = await fetch('http://localhost:8000/add-player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        const response_data = await response;
        return response_data;
    }

    /********************************************
     * GET summary info for players whose names *
     * match the search time on each keystroke, *
     * update the table appropriately           *
     ********************************************/
    async getPlayersByName(searchTerm){
        const response = await fetch(`http://localhost:8000/players/name/${searchTerm}`);
        const response_data = await response.json();
        return response_data;
    }

    /********************
     * GET player by id *
     ********************/
    async getPlayerById(id){
        const response = await fetch(`http://localhost:8000/players/id/${id}`);
        const response_data = await response.json();
        return response_data;
    }
}