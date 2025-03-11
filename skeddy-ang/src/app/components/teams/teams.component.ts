import { Component, inject } from '@angular/core';
import { LeaguesService } from '../../services/leagues.service';
import { League } from '../../model/league.type';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-teams',
  imports: [MatCardModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  leagueService = inject(LeaguesService);
  selectedLeague = this.leagueService.selectedLeague;

  getTeamNames(teams: Map<String, String> | undefined): String[] {
    return teams ? Array.from(teams.keys()) : [];
  }
}
