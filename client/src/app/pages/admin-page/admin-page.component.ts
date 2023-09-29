import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ImportGameDialogComponent } from '@app/import-game-dialog/import-game-dialog.component';
import { Question } from '@app/interfaces/definitions';
import { CommunicationService } from '@app/services/communication.service';
import { GameCreationService } from '@app/services/gamecreation.service';
import { PasswordService } from '@app/services/password.service';
import { Subscription, firstValueFrom } from 'rxjs';

export interface Games {
    id: string;
    name: string;
    description: string;
    questions: Question[];
    time: number;
    lastModification: string;
    visible?: boolean;
}

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnDestroy, OnInit {
    displayedColumns: string[] = ['gameName', 'gameDate', 'gameOptions', 'gameVisible'];
    selection = new SelectionModel<Games>(true, []);
    dataSource: MatTableDataSource<Games>;
    subscription: Subscription;

    constructor(
        private passwordService: PasswordService,
        readonly gameCreationService: GameCreationService,
        readonly communicationService: CommunicationService,
        private router: Router,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.subscription = this.gameCreationService.gamesObs$.subscribe((games) => {
            // console.log('Game:', games);
            this.dataSource = new MatTableDataSource<Games>(games);
        });
    }

    ngOnDestroy(): void {
        this.passwordService.setLoginState(false);
    }

    create(): void {
        this.router.navigate(['/game/create']);
        this.gameCreationService.create();
    }

    modify(game: Games): void {
        this.gameCreationService.selectedGame = game;
        this.gameCreationService.modify();
        this.router.navigate(['/game/create']);
    }

    exportGame(game: Games): void {
        this.gameCreationService.selectedGame = game;
        if (this.gameCreationService.selectedGame) {
            const gameCopy = { ...this.gameCreationService.selectedGame };
            delete gameCopy.visible;

            // found on https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
            const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(gameCopy));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute('href', dataStr);
            downloadAnchorNode.setAttribute('download', game.name + '.json');
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        }
    }

    importDialog(): void {
        const dialogRef = this.dialog.open(ImportGameDialogComponent);
        dialogRef.afterClosed().subscribe((importedGame) => {
            if (importedGame) {
                this.gameCreationService.sendToServer(importedGame);
            }
        });
    }

    toggleVisibility(game: Games): void {
        game.visible = !game.visible;
        this.gameCreationService.selectedGame = game;
        this.gameCreationService.putToServer(this.gameCreationService.selectedGame);
    }

    async deleteGame(game: Games): Promise<void> {
        await firstValueFrom(this.gameCreationService.delete(game));
        this.dataSource.data = this.dataSource.data.filter((g) => g !== game);
    }
}
