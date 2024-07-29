
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players = [];

  constructor() {}

  ngOnInit() { this.players = [{name: "Player1", position: "Forward"}, {name: "Player2", position: "Guard"}]; }

  deletePlayer(index: number) { this.players.splice(index, 1); }
}
