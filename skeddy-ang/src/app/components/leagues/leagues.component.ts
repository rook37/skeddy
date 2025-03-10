import { Component, inject, OnInit, signal } from '@angular/core';
import { LeaguesService } from '../../services/leagues.service';
import { League } from '../../model/league.type';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-leagues',
  imports: [MatCardModule],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.scss'
})

export class LeaguesComponent implements OnInit {
  leagueService = inject(LeaguesService)
  leagues = signal<Array<League>>([]);

  ngOnInit(): void {
    this.leagues.set(this.leagueService.leagues)
  }

  getTeamNames(teams: Map<String, String>): String[] {
    return Array.from(teams.keys());
  }

}
