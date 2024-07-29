
@echo off

:: Navigate to the project directory
cd C:\Users\venka\angular-tour-of-heroes

:: Forcefully create or overwrite the player-form component files manually
mkdir src\app\player-form 2>nul
(
echo import { Component } from '@angular/core';
echo @Component({
echo   selector: 'app-player-form',
echo   templateUrl: './player-form.component.html',
echo   styleUrls: ['./player-form.component.css']
echo })
echo export class PlayerFormComponent {
echo   player = {
echo     name: '',
echo     position: ''
echo   };
echo   constructor() {}
echo   addPlayer() { console.log(this.player); }
echo }
) > src\app\player-form\player-form.component.ts

(
echo <form (ngSubmit)="addPlayer()">
echo   <label for="name">Name:</label>
echo   <input type="text" id="name" [(ngModel)]="player.name" name="name" required>
echo   <label for="position">Position:</label>
echo   <input type="text" id="position" [(ngModel)]="player.position" name="position" required>
echo   <button type="submit">Add Player</button>
echo </form>
) > src\app\player-form\player-form.component.html

echo /* Add your styles here */ > src\app\player-form\player-form.component.css

:: Forcefully create or overwrite the player-list component files manually
mkdir src\app\player-list 2>nul
(
echo import { Component, OnInit } from '@angular/core';
echo @Component({
echo   selector: 'app-player-list',
echo   templateUrl: './player-list.component.html',
echo   styleUrls: ['./player-list.component.css']
echo })
echo export class PlayerListComponent implements OnInit {
echo   players = [];
echo   constructor() {}
echo   ngOnInit() { this.players = [{name: "Player1", position: "Forward"}, {name: "Player2", position: "Guard"}]; }
echo   deletePlayer(index: number) { this.players.splice(index, 1); }
echo }
) > src\app\player-list\player-list.component.ts

(
echo <ul>
echo   <li *ngFor="let player of players; let i = index">
echo     {{ player.name }} - {{ player.position }}
echo     <button (click)="deletePlayer(i)">Delete</button>
echo   </li>
echo </ul>
) > src\app\player-list\player-list.component.html

echo /* Add your styles here */ > src\app\player-list\player-list.component.css

:: Update app.module.ts to include the new components
(
echo import { BrowserModule } from '@angular/platform-browser';
echo import { NgModule } from '@angular/core';
echo import { FormsModule } from '@angular/forms';
echo import { HttpClientModule } from '@angular/common/http';
echo import { AppComponent } from './app.component';
echo import { PlayerFormComponent } from './player-form/player-form.component';
echo import { PlayerListComponent } from './player-list/player-list.component';
echo @NgModule({
echo   declarations: [
echo     AppComponent,
echo     PlayerFormComponent,
echo     PlayerListComponent
echo   ],
echo   imports: [
echo     BrowserModule,
echo     FormsModule,
echo     HttpClientModule
echo   ],
echo   providers: [],
echo   bootstrap: [AppComponent]
echo })
echo export class AppModule { }
) > src\app\app.module.ts

:: Update app.component.html to include the new components
(
echo <router-outlet></router-outlet>
echo <div>
echo   <h1>Player Management</h1>
echo   <app-player-form></app-player-form>
echo   <app-player-list></app-player-list>
echo </div>
) > src\app\app.component.html

:: Run Angular application
ng serve
