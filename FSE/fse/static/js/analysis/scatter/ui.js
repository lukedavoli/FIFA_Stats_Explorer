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
        let players = JSON.parse(sessionStorage.getItem('sctrChartPlayers'));
        this.players_sctr.innerHTML = "";
        if (players){
            players.forEach((player) => {
                this.players_sctr.innerHTML +=
                    `<li class="list-group-item">${player.info.type} ${player.info.knownas} (${player.info.rating})</li>`
            });   
        }
    }

    updateChart_sctr(xstat, ystat, focused){
        let players = JSON.parse(sessionStorage.getItem('sctrChartPlayers'));
        let labels = [];
        let stats = [];

        let min_x_val = 100;
        let max_x_val = -1;
        let min_y_val = 100;
        let max_y_val = -1;

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

                if(statpair['x'] < min_x_val){
                    min_x_val = statpair['x'];
                }
                if(statpair['x'] > max_x_val){
                    max_x_val = statpair['x'];
                }
                if(statpair['y'] < min_y_val){
                    min_y_val = statpair['y'];
                }
                if(statpair['y'] > max_x_val){
                    min_y_val = statpair['y'];
                }
                stats.push(statpair);
            });
        }

        if(!focused){
            min_x_val = 0;
            max_x_val = 100;
            min_y_val = 0;
            max_y_val = 100;
        }else{
            min_x_val = min_x_val - 10;
            max_x_val = max_x_val + 10;
            min_y_val = min_y_val - 10;
            max_y_val = max_y_val + 10;
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
                    pointRadius: 7
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
                            suggestedMin: min_y_val,
                            suggestedMax: max_y_val
                        },
                        scaleLabel: {
                            display: true,
                            labelString: ystat,
                            fontSize: 20,
                          }
                    }],
                    xAxes: [{
                        ticks: {
                            suggestedMin: min_x_val,
                            suggestedMax: max_x_val
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