import { Component } from '@angular/core';
import { LeaguesComponent } from '../components/leagues/leagues.component';
import { TeamsComponent } from '../components/teams/teams.component';

@Component({
  selector: 'app-home',
  imports: [LeaguesComponent,TeamsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
