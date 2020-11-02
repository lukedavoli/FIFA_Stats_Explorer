class UI{
    constructor(){
        this.dlPlayers = document.getElementById('players-list');
        this.barChartPlayers = document.getElementById('barChartPlayers');
        this.barChart = document.getElementById('barChart').getContext('2d');
        this.summary_stats = ['DEF', 'DRI', 'SHO', 'PAS', 'PHY', 'PAC'];
        this.colors = ['rgba(255, 15, 15, 0.4)', 'rgba(255, 135, 15, 0.4)', 
                        'rgba(255, 255, 15, 0.4)', 'rgba(135, 255, 15, 0.4)', 
                        'rgba(15, 255, 15, 0.2)', 'rgba(15, 255, 255, 0.2)', 
                        'rgba(15, 15, 255, 0.2)', 'rgba(255, 15, 255, 0.2)']
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
                `<li class="list-group-item">${player.info.type} ${player.info.knownas} (${player.info.rating})</li>`
        });   
    }

    updateBarChart(stat){
        let players = JSON.parse(sessionStorage.getItem('barChartPlayers'));
        let labels = [];
        let stats = [];

        players.forEach((player) => {
            labels.push(`${player.info.type} ${player.info.knownas}`);
            if(this.summary_stats.indexOf(stat) > -1){
                stats.push(player.stats_summary[stat])
            }else{
                stats.push(player.stats_ingame[stat])
            } 
        })

        if(window.myBarChart) myBarChart.destroy();
        window.myBarChart = new Chart(this.barChart, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: stat,
                    data: stats,
                    backgroundColor: this.colors
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }]
                }
            }
        });
    }
}