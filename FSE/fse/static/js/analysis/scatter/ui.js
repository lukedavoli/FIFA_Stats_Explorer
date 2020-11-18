class UI_sctr{
    constructor(){
        this.players_sctr = document.getElementById('players-sctr');
        this.chart_sctr = document.getElementById('chart-sctr').getContext('2d');
        this.dlPlayers_sctr = document.getElementById('players-list-sctr');

        this.summary_stats = ['DEF', 'DRI', 'SHO', 'PAS', 'PHY', 'PAC'];

        this.backColors = []
        let i = 0;
        while(i < 15){
            let x = 1 + i * 24
            this.backColors.push(`hsla(${x}, 100%, 51%, 0.7)`);
            i++;
        }
    }

    updatePlayerOptions(players){
        this.dlPlayers_sctr.innerHTML = "";
        players.forEach((player) => {
            this.dlPlayers_sctr.innerHTML += 
                `<option value="${player.id}">${player.type} ${player.name} (${player.rating})</option>`
        });
    }

    emptyPlayerOptions(){
        this.dlPlayers_sctr.innerHTML = "";
    }

    clearField(field){
        field.value = "";
    }

    updatePlayers_sctr(){
        let players = JSON.parse(sessionStorage.getItem('players_sctr'));
        this.players_sctr.innerHTML = "";
        if (players){
            players.forEach((player) => {
                this.players_bar.innerHTML +=
                    `<li class="list-group-item">${player.info.type} ${player.info.knownas} (${player.info.rating})</li>`
            });   
        }
    }

    updateChart_sctr(xstat, ystat, focused){
        let players = JSON.parse(sessionStorage.getItem('sctrChartPlayers'));
        let labels = [];
        let stats = [];

        if(players){
            players.forEach((player) => {
                labels.push(`${player.info.type} ${player.info.knownas}`);

                let statpair = {};
                if(this.summary_stats.indexOf(xstat) > -1){
                    statpair['x'] = player.stats_summary[xstat];
                }else{
                    statpair['x'] = player.stats_ingame[xstat];
                }
                if(this.summary_stats.indexOf(ystat) > -1){
                    statpair['y'] = player.stats_summary[ystat];
                }else{
                    statpair['y'] = player.stats_ingame[ystat];
                }
                stats.push(statpair);
            });
        }
        
        if(window.mychart_sctr) mychart_sctr.destroy();
        window.mychart_sctr = new Chart(this.chart_sctr, {
            type: 'scatter',
            data: {
                labels: labels,
                datasets: [{
                    fontSize: 24,
                    label: `${xstat} vs ${ystat}`,
                    data: stats,
                    pointBackgroundColor: this.backColors,
                    pointRadius: 5
                }]
            },
            options: {
                tooltips: {
                    bodyFontSize: 18,
                    bodyFontStyle: 'bold',
                    footerFontSize: 16,
                    footerFontStyle: 'normal',
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return data.labels[tooltipItem.index];
                        },
                        footer: function(tooltipItem, data) {
                            let tt = [`${xstat}: ${tooltipItem.xLabel}`];
                            tt.push(`${ystat}: ${tooltipItem.yLabel}`);
                            return tt;
                        }
                    },
                    mode: 'nearest',
                    intersect: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        },
                        scaleLabel: {
                            display: true,
                            labelString: ystat,
                            fontSize: 20,
                          }
                    }],
                    xAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        },
                        scaleLabel: {
                            display: true,
                            labelString: xstat,
                            fontSize: 20,
                          }
                    }]
                }
            }
        });
    }
}