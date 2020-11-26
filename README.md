# Fifa Stats Explorer

## Focus Topics
* Python, HTML/CSS/Javascript
* REST API and front-end development (Flask)
* Web-scraping (BeautifulSoup)
* Plotting in the browser (Chart.js)

## Overview
A small side-project for some practice with a few skills.

Websites like FUTWIZ and Futhead provide information on in-game statistics of all Ultimate Team players. While you can compare stats of players, this is restricted to raw numbers on 40 different statistics. It can be difficult to make the right choice on which player to spend money on if you want to take a broad range of statistics or more than 2 or 3 players into consideration.

This simple app solves this problem by providing a quick and easy way to visualise and compare player statistics at a larger scale in a bar-chart, scatterplot or radar-chart with many players at once or many statistics at once.

## Features
Functionality includes... 
* adding players to an SQLite database using FUTWIZ url
* searching the database by player name

![database add and search](https://media.giphy.com/media/VqjEtUBaBh0MT7Brm3/giphy.gif)

* interactive bar chart analysis of players in database 

![bar chart](https://media.giphy.com/media/a3nJPz5dCimEGnO6bi/giphy.gif)

* Scatterplot for two stats on any number of players

![scatterplot](https://media.giphy.com/media/VAdQxe2uKxFEg7FNJ8/giphy.gif)

* Radar chart for up to 9 stats on 1, 2 or 3 players

![radar](https://media.giphy.com/media/xQTFCWC88QsM0LjheD/giphy.gif)

## Developement Environment
* OS: Windows 10, 64-bit
* Language: Python 3.8.5
* Web Framework: Flask 1.1.2
