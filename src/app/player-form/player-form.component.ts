
import { Component } from '@angular/core';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent {
  player = {
    name: '',
    position: ''
  };

  constructor() {}

  addPlayer() { console.log(this.player); }
}
