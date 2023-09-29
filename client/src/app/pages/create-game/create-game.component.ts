import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuestionDialogComponent } from '@app/components/question-dialog/question-dialog.component';
import { Game, Question } from '@app/interfaces/definitions';
import { CommunicationService } from '@app/services/communication.service';
import { GameCreationService } from '@app/services/gamecreation.service';
import { PasswordService } from '@app/services/password.service';

const IMPOSSIBLE_INDEX = -1;
const BASE_MESSAGE_TIME = 'Mettez un chiffre entre 10 et 60';

@Component({
    selector: 'app-create-game',
    templateUrl: './create-game.component.html',
    styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit {
    messtime: string = BASE_MESSAGE_TIME;
    messname: string = '';
    isEdit: boolean = false;

    game: Game = {
        name: '',
        description: '',
        time: 0,
        questions: [],
        id: '',
        lastModification: '',
        visible: false,
    };

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private passwordService: PasswordService,
        readonly communicationservice: CommunicationService,
        readonly gameCreationService: GameCreationService,
    ) {
        this.isEdit = this.gameCreationService.edit;
    }

    ngOnInit() {
        this.communicationservice.basicGet().subscribe((e) => (this.gameCreationService.gameList = e));
        if (this.gameCreationService.selectedGame && this.isEdit) {
            this.game = this.gameCreationService.selectedGame;
        }
    }

    checkTime(): void {
        const timeCheck = this.gameCreationService.isTimeValid(this.game.time);
        this.messtime = timeCheck[0];
    }

    checkName(): void {
        const nameCheck = this.gameCreationService.isNameValid(this.game.name);
        this.messname = nameCheck[0];
    }

    validateAndCreate(): void {
        const isNameValid = this.gameCreationService.isNameValid(this.game.name);
        const isTimeValid = this.gameCreationService.isTimeValid(this.game.time);
        if (isNameValid[1] && isTimeValid[1]) {
            const now = new Date();
            const date = now.toLocaleDateString('en-GB');
            const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
            this.game.lastModification = `${date} ${time}`;
            this.gameCreationService.sendToServer(this.game);
        }
        this.passwordService.setLoginState(true);
        this.router.navigate(['/admin']);
    }

    validateAndEdit(): void {
        // const isNameValid = this.gameCreationService.isNameValid(this.game.name);
        // const isTimeValid = this.gameCreationService.isTimeValid(this.game.time);
        if (this.isEdit && this.gameCreationService.selectedGame) {
            this.game = this.gameCreationService.selectedGame;
            const now = new Date();
            const date = now.toLocaleDateString('en-GB');
            const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
            this.game.lastModification = `${date} ${time}`;
            this.gameCreationService.putToServer(this.game);
        }
        this.passwordService.setLoginState(true);
        this.router.navigate(['/admin']);
    }

    openDialog() {
        const dialogRef = this.dialog.open(QuestionDialogComponent);

        dialogRef.afterClosed().subscribe((question: Question) => {
            if (question) {
                this.game.questions.push(question);
            }
        });
    }

    drop(event: CdkDragDrop<Question[]>) {
        moveItemInArray(this.game.questions, event.previousIndex, event.currentIndex);
    }

    editQuestion(index: number) {
        const dialogRef = this.dialog.open(QuestionDialogComponent, {
            data: { ...this.game.questions[index] },
        });

        dialogRef.afterClosed().subscribe((updatedQuestion) => {
            if (updatedQuestion) {
                this.game.questions[index] = updatedQuestion;
            }
        });
    }

    deleteQuestion(index: number) {
        if (index > IMPOSSIBLE_INDEX) {
            this.game.questions.splice(index, 1);
        }
    }

    cancelButton(): void {
        this.passwordService.setLoginState(true);
        this.router.navigate(['/admin']);
    }
}
