import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService, Player } from '../player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  playerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService
  ) {
    this.playerForm = this.fb.group({
      name: ['', Validators.required],
      team: ['', Validators.required],
      position: ['', Validators.required],
      touchdownPasses: [0, Validators.required],
      rushingYards: [0, Validators.required],
      fieldGoals: [0, Validators.required],
      sacks: [0, Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.playerForm.valid) {
      this.playerService.addPlayer(this.playerForm.value).subscribe();
    }
  }
}
