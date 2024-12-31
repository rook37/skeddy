import pandas as pd
import requests
from datetime import datetime
from bs4 import BeautifulSoup

#Update these to grab other team schedules
teamName = 'if-bjorkloven'
leagueId = '15' #hockeyallsvenskan
season = '2024-2025'

class gameMatch:
    def __init__(self,date,home,away):
        self.date = date
        self.home = home
        self.away = away
    def toString(self):
        print(self.date.strftime('%Y-%m-%d %H:%M:%S%z')+' - '+self.away+' @ '+self.home)

def buildData(data,url):
    response = requests.get(url);
    request = BeautifulSoup(response.content,'html.parser');
    matchTable = request.find('table', class_='table-games');
    matches = matchTable.find_all('tr')
    for event in matches:
        date = event.find('td', class_='date')
        homeAway = event.find_all('td',class_='team')
        if(len(homeAway)<2):
            continue
        date = datetime.strptime(date.text.strip(), '%Y-%m-%dT%H:%M:%S%z')
        date = date.astimezone();
        home = homeAway[0].text.strip()
        away = homeAway[1].text.strip()
        newMatch = gameMatch(date,home,away)
        data.append(newMatch)

def buildOutput(data,output):
    for game in data:
        game = {'Subject': f'{game.home} @ {game.away}','Start Date': game.date.date(),'Start Time':game.date.time()}
        output.append(game)
    
    
def main():
    urlPrev = f'https://www.eliteprospects.com/games/{season}/*/{leagueId}/{teamName}'
    urlPost = f'https://www.eliteprospects.com/games/upcoming/{season}/*/{leagueId}/{teamName}'
    data = []
    output =[]
    buildData(data,urlPrev)
    buildData(data,urlPost)
    buildOutput(data,output)
    df = pd.DataFrame(output)
    df['Start Date']=pd.to_datetime(df['Start Date'])
    df.sort_values(by='Start Date',inplace=True)
    print(df)
    df.to_csv(teamName+'sched.csv',index=False)
    print('\n'+teamName+' schedule exported to '+teamName+'sched.csv! Enjoy the season!')


main()














