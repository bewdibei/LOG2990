import { Injectable } from '@angular/core';
import { Game } from '@app/interfaces/definitions';
import { Games } from '@app/pages/admin-page/admin-page.component';
import { CommunicationService } from '@app/services/communication.service';
import { BehaviorSubject, Observable } from 'rxjs';

const MIN_TIME = 10;
const MAX_TIME = 60;

@Injectable({
    providedIn: 'root',
})
export class GameCreationService {
    gameList: Game[] = [];
    edit: boolean = false;
    selectedGame: Games | null = null;
    gamesObs$ = new BehaviorSubject<Game[]>([]);

    constructor(private readonly communicationService: CommunicationService) {
        this.fetchGamesFromServer();
    }

    get games(): Game[] {
        return this.gameList;
    }

    get games$() {
        return this.gamesObs$.asObservable();
    }

    set games(game: Game[]) {
        this.gameList = game;
        this.gamesObs$.next(game);
    }

    isTimeValid(time: number): [string, boolean] {
        const timeIsValid = time >= MIN_TIME && time <= MAX_TIME;
        if (timeIsValid) {
            return ['Tout est correct', true];
        } else {
            return ['Mettez un chiffre entre 10 et 60', false];
        }
    }

    isNameValid(name: string): [string, boolean] {
        const nameExist = this.games.find((v) => v.name === name) && name !== '';
        if (nameExist) return ['Le nom doit etre unique', false];
        else if (name === '') return ['Mettez un nom valable', false];
        else return ['Correct', true];
    }

    sendToServer(game: Game): void {
        this.communicationService.basicPost(game).subscribe();
    }

    putToServer(game: Game): void {
        this.communicationService.basicPut(game).subscribe();
    }

    create(): void {
        this.edit = false;
    }

    modify(): void {
        this.edit = true;
    }

    delete(game: Games): Observable<void> {
        return this.communicationService.basicDelete(`/game/${game.name}`);
    }

    private fetchGamesFromServer(): void {
        this.communicationService.basicGet().subscribe((games: Game[]) => {
            this.games = games;
        });
    }
}
