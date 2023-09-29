import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Game } from '@app/interfaces/definitions';
import { CommunicationService } from '@app/services/communication.service';
import { GameCreationService } from '@app/services/gamecreation.service';

@Component({
    selector: 'app-import-game-dialog',
    templateUrl: './import-game-dialog.component.html',
    styleUrls: ['./import-game-dialog.component.scss'],
})
export class ImportGameDialogComponent {
    importedGame: Game;
    errorMessage: string = '';

    constructor(
        private dialogRef: MatDialogRef<ImportGameDialogComponent>,
        private communicationService: CommunicationService,
        private gameCreationService: GameCreationService,
    ) {}

    // found here: https://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
    onFileSelected(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        const selectedFile = inputElement.files?.[0];

        if (selectedFile) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                try {
                    this.importedGame = JSON.parse(fileReader.result as string);
                } catch (error) {
                    console.error('Invalid JSON file');
                }
            };
            fileReader.readAsText(selectedFile);
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onImport(): void {
        if (!this.importedGame) {
            this.errorMessage = 'Aucun jeu importé';
            return;
        }

        const isNameValid = this.gameCreationService.isNameValid(this.importedGame.name);
        const isTimeValid = this.gameCreationService.isTimeValid(this.importedGame.time);

        if (!isNameValid[1]) {
            this.errorMessage = isNameValid[0];
            return;
        }

        if (!isTimeValid[1]) {
            this.errorMessage = isTimeValid[0];
            return;
        }

        this.communicationService.basicGet().subscribe((games: Game[]) => {
            const existingGame = games.find((game) => game.name === this.importedGame.name);
            if (existingGame) {
                this.errorMessage = 'Un jeu avec le même nom existe déjà';
                return;
            }

            // Si tout est valide, fermez la modale et renvoyez le jeu importé
            this.dialogRef.close(this.importedGame);
        });
    }
}
