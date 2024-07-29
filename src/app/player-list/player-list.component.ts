import { Component, OnInit } from '@angular/core';
import { PlayerService, Player } from '../player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers().subscribe(players => this.players = players);
  }

  deletePlayer(id: string): void {
    this.playerService.deletePlayer(id).subscribe(() => this.getPlayers());
  }

  editPlayer(player: Player): void {
    // Logic to edit player can be added here
  }
}
