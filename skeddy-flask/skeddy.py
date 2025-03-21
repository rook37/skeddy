import pandas as pd
import requests
import pytz
from unidecode import unidecode
from datetime import datetime
from bs4 import BeautifulSoup

#Update these to grab other team schedules
teamName = 'if-bjorkloven'
leagueId = '15' #hockeyallsvenskan
season = '2024-2025'

class GameMatch:
    def __init__(self,date,home,away):
        self.date = date
        self.home = home
        self.away = away
    def toString(self):
        print(self.date.strftime('%Y-%m-%d %H:%M:%S%z')+' - '+self.away+' @ '+self.home)

def build_data(data,url,tz):
    response = requests.get(url);
    request = BeautifulSoup(response.content,'html.parser');
    match_table = request.find('table', class_='table-games');
    matches = match_table.find_all('tr')
    for event in matches:
        date = event.find('td', class_='date')
        homeAway = event.find_all('td',class_='team')
        if(len(homeAway)<2):
            continue
        date = datetime.strptime(date.text.strip(), '%Y-%m-%dT%H:%M:%S%z')
    
        date = date.astimezone(tz)
        
        home = homeAway[0].text.strip()
        away = homeAway[1].text.strip()
        new_match = GameMatch(date,home,away)
        data.append(new_match)

def build_output(data,output):
    for game in data:
        game = {'Subject': f'{game.home} @ {game.away}','Start Date': game.date.date(),'Start Time':game.date.time()}
        output.append(game)
    
    
def fetch_schedule(season,team_id,user_tz):
    try:
        url_prev = f'https://www.eliteprospects.com/games/{season}/all-leagues/{team_id}'
        url_post = f'https://www.eliteprospects.com/games/upcoming/{season}/all-leagues/{team_id}'
        data = []
        output =[]
        tz = pytz.timezone(user_tz)
        print(tz)
        build_data(data,url_prev,tz)
        build_data(data,url_post,tz)
        build_output(data,output)
        df = pd.DataFrame(output)
        df['Start Date']=pd.to_datetime(df['Start Date'])
        df.sort_values(by='Start Date',inplace=True)
        csv_path = 'curr_sched.csv'
        df.to_csv(csv_path,index=False)
        return {"success": True, "csv_path": csv_path, "output": output}
        #print('\n'+team_name+' schedule exported to '+team_name+'sched.csv! Enjoy the season!')
    except Exception as e:
        return {"success":False, "error":str(e)} 











