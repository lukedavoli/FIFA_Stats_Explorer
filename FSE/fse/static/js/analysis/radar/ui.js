class UI_rdr{
    constructor(){
        this.chart_rdr = document.getElementById('chart-rdr').getContext('2d');
        this.dlPlayers1_rdr = document.getElementById('players-list1-rdr');
        this.dlPlayers2_rdr = document.getElementById('players-list2-rdr');
        this.dlPlayers3_rdr = document.getElementById('players-list3-rdr');

        this.summary_stats = ['DEF', 'DRI', 'SHO', 'PAS', 'PHY', 'PAC'];
    }

    // Update the player options list for the appropriate player box
    updatePlayerOptions(element, players){
        let dl = null;
        if(element.id == 'player-search1-rdr'){
            dl = this.dlPlayers1_rdr;
        }else if(element.id == 'player-search2-rdr'){
            dl = this.dlPlayers2_rdr;
        }else{
            dl = this.dlPlayers3_rdr;
        }
        dl.innerHTML = '';
        players.forEach((player) => {
            dl.innerHTML += 
                `<option value="${player.id}">${player.type} ${player.name} (${player.rating})</option>`
        });
    }


    // Redraw the chart
    updateChart_rdr(stat_boxes){
        let labels = []
        let p1 = []
        let p2 = []
        let p3 = []
        let player1 = JSON.parse(sessionStorage.getItem('rdrChartPlayer1'));
        let player2 = JSON.parse(sessionStorage.getItem('rdrChartPlayer2'));
        let player3 = JSON.parse(sessionStorage.getItem('rdrChartPlayer3'));
        let min = 100;
        let max = 0;
        let nxtStat = null;
        
        // Collect the stats necessary for each player
        stat_boxes.forEach(stat_box => {
            if(stat_box.value){
                const stat = stat_box.value;
                labels.push(stat);
                if(this.summary_stats.indexOf(stat) > -1){
                    if(player1 != null){
                        nxtStat = player1.stats_summary[`${stat}`];
                        if(nxtStat < min) min = nxtStat;
                        p1.push(nxtStat);
                    }
                    if(player2 != null){
                        nxtStat = player2.stats_summary[`${stat}`];
                        if(nxtStat < min) min = nxtStat;
                        p2.push(nxtStat); 
                    }
                    if(player3 != null){
                        nxtStat = player3.stats_summary[`${stat}`];
                        if(nxtStat < min) min = nxtStat;
                        p3.push(nxtStat); 
                    }
                }else{
                    if(player1 != null){
                        nxtStat = player1.stats_ingame[`${stat}`];
                        if(nxtStat < min) min = nxtStat;
                        p1.push(nxtStat); 
                    }
                    if(player2 != null){
                        nxtStat = player2.stats_ingame[`${stat}`];
                        if(nxtStat < min) min = nxtStat;
                        p2.push(nxtStat);
                    }
                    if(player3 != null){
                        nxtStat = player3.stats_ingame[`${stat}`];
                        if(nxtStat < min) min = nxtStat;
                        p3.push(nxtStat);
                    }
                }
            }
        });

        let datasets = [];
        if(player1 != null){
            datasets.push({
                data: p1,
                label: `${player1.info.type} ${player1.info.knownas}`,
                backgroundColor: ('rgba(255, 182, 0, 0.3)'),
                borderColor: ('rgba(255, 182, 0, 0.7)'),
                borderWidth: 2
            })
        }
        if(player2 != null){
            datasets.push({
                data: p2,
                label: `${player2.info.type} ${player2.info.knownas}`,
                backgroundColor: ('rgba(33, 249, 0, 0.3)'),
                borderColor: ('rgba(33, 249, 0, 0.7)'),
                borderWidth: 2
            })
        }
        if(player3 != null){
            datasets.push({
                data: p3,
                label: `${player3.info.type} ${player3.info.knownas}`,
                backgroundColor: ('rgba(5, 138, 255, 0.3)'),
                borderColor: ('rgba(5, 138, 255, 0.7)'),
                borderWidth: 2
            })
        }

        if(window.mychart_rdr) mychart_rdr.destroy();
        window.mychart_rdr = new Chart(this.chart_rdr, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                tooltips: {
                    bodyFontSize: 14,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        }
                    },
                },
                scale: {
                    ticks: {
                        min: min - 10,
                        max: 100
                    }
                }
            }
        });

    }
}