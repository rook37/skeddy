import { Component } from '@angular/core';
import { LeaguesComponent } from '../components/leagues/leagues.component';

@Component({
  selector: 'app-home',
  imports: [LeaguesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
