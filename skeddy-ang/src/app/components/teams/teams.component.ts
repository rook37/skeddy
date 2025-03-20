import { Component, inject } from '@angular/core';
import { LeaguesService } from '../../services/leagues.service';
import { League } from '../../model/league.type';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import unidecode from 'unidecode';

@Component({
  selector: 'app-teams',
  imports: [MatCardModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  leagueService = inject(LeaguesService);
  selectedLeague = this.leagueService.selectedLeague;
  http = inject(HttpClient);

  getTeamNames(teams: Map<String, String> | undefined): String[] {
    return teams ? Array.from(teams.keys()) : [];
  }

  generateScheduleCSV(team_id : String){
    const url = `http://localhost:5000/`
    let userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let season = "2024-2025"
    let result = this.http.post(url,{'id':team_id,'season':season,'timezone':userTz}, { responseType: 'blob'})
    return result
  }

  downloadSchedule(team_name: String) {
    const team_id = String(this.selectedLeague()?.teams.get(team_name))
    team_name = unidecode(team_name.toLowerCase().replaceAll(' ',"_"))
  
    this.generateScheduleCSV(team_id).subscribe({
      next: (response: Blob) => {
        const csv_url = window.URL.createObjectURL(response);
        const download_link = document.createElement('a');
        download_link.href = csv_url;
        download_link.download = `${team_name}_schedule.csv`; 
        download_link.click();
        window.URL.revokeObjectURL(csv_url); 
      },
      error: (error) => {
        console.error('Error downloading schedule:', error);
      }
    });
  }
  
}
