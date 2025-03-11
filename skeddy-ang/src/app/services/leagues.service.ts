import { Injectable, signal } from '@angular/core';
import { League } from '../model/league.type';

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {
  leagues: Array<League> =[
    {
      name:'SHL',
      leagueId:1,
      teams: new Map([
        ["Vaxjo Lakers","vaxjo-lakers"]
      ])
    },
    {
      name:'HockeyAllsvenskan',
      leagueId:2,
      teams: new Map([
        ["AIK","aik"],
        ["Almtuna IS","almtuna-is"],
        ["BIK Karlskoga","bik-karlskoga"],
        ["Djurgårdens IF","djurgardens-if"],
        ["IF Björklöven","if-bjorkloven"],
        ["IK Oskarshamn","ik-oskarshamn"],
        ["Kalmar HC","kalmar-hc"],
        ["Mora IK","mora-ik"],
        ["Nybro Vikings IF","nybro-vikings-if"],
        ["Södertälje SK","sodertalje-sk"],
        ["Tingsryds AIF","tingsryds-aif"],
        ["Vimmerby HC","vimmerby-hc"],
        ["Västerås IK","vasteras-ik"],
        ["Östersunds IK","ostersunds-ik"]])
    }
  ]

  selectedLeague = signal<League | null>(null);

  selectLeague(league: League): void {
    this.selectedLeague.set(league);
  }


  constructor() { }
}
