import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Player {
  _id?: string;
  name: string;
  team: string;
  position: string;
  touchdownPasses: number;
  rushingYards: number;
  fieldGoals: number;
  sacks: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000/api/players';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }

  getPlayer(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${id}`);
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  updatePlayer(player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/${player._id}`, player);
  }

  deletePlayer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMostTouchdownPasses(): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/query/most-touchdown-passes`);
  }

  getMostRushingYards(): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/query/most-rushing-yards`);
  }

  getLeastRushingYards(): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/query/least-rushing-yards`);
  }

  getMostFieldGoals(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/query/most-field-goals`);
  }

  getMostSacks(): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/query/most-sacks`);
  }
}
