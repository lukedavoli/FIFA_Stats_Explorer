const updateForm = document.getElementById('addPlayerForm');
const urlField = document.getElementById('urlField')
const requestStatus = document.getElementById('requestStatus');

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    requestStatus.className = "inprogress";
    requestStatus.innerHTML = "Adding player to database...";
    
    const url_to_scrape = urlField.value;

    const request = {
        url: url_to_scrape
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/add-player', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4){
            if (xhr.status === 200) { // Successful update
                var response = JSON.parse(xhr.responseText);
                console.log(response);

                requestStatus.className = "complete";
                requestStatus.innerHTML = "Player added to database!";
            
            }else{ // Bad request arguments
                var response = JSON.parse(xhr.responseText);
                console.log(response);

                requestStatus.className = "failed";
                requestStatus.innerHTML = "Failed to add player to database";
            }
        }
    };
    xhr.send(JSON.stringify(request));
});