import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent,HeaderComponent],
  template: `
    <app-header/>
    <app-home />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'skeddy-ang';
}
 