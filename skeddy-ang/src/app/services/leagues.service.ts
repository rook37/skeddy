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
        ["AIK","1"],
        ["Almtuna IS","13"],
        ["BIK Karlskoga","25"],
        ["Djurgårdens IF","3"],
        ["IF Björklöven","15"],
        ["IK Oskarshamn","31"],
        ["Kalmar HC","778"],
        ["Mora IK","29"],
        ["Nybro Vikings IF","335"],
        ["Södertälje SK","10"],
        ["Tingsryds AIF","33"],
        ["Vimmerby HC","498"],
        ["Västerås IK","308"],
        ["Östersunds IK","1595"]])
    }
  ]

  selectedLeague = signal<League | null>(null);

  selectLeague(league: League): void {
    this.selectedLeague.set(league);
  }


  constructor() { }
}
