import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AdminPageComponent, Games } from './admin-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameCreationService } from '@app/services/gamecreation.service';
import { BehaviorSubject } from 'rxjs';
// import { MatTableDataSource } from '@angular/material/table';
import { GameCommon } from '@common/Game';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
// import { PasswordService } from '@app/services/password.service';

fdescribe('AdminPageComponent', () => {
    let component: AdminPageComponent;
    let fixture: ComponentFixture<AdminPageComponent>;
    let gameCreationService: jasmine.SpyObj<GameCreationService>;

    // let passwordService: jasmine.SpyObj<PasswordService>;

    beforeEach(async () => {
        gameCreationService = jasmine.createSpyObj('GameCreationService', ['create', 'modify', 'putToServer', 'delete']);
        gameCreationService.gamesObs$ = new BehaviorSubject<GameCommon[]>([]);
        await TestBed.configureTestingModule({
            declarations: [AdminPageComponent],
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [{ provide: GameCreationService, useValue: gameCreationService }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminPageComponent);
        // mockRouter = TestBed.inject(Router);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    // it('should call getGames and return games', async () => {
    //     const game: GameCommon[] = [
    //         {
    //             id: '',
    //             name: '',
    //             description: '',
    //             time: 10,
    //             questions: [],
    //             lastModification: '',
    //             visible: false,
    //         },
    //     ];
    //     gameCreationService.gamesObs$.next(game);
    //     const spy = spyOn(component, 'getGames');
    //     component.ngOnInit();
    //     expect(spy).toHaveBeenCalled();
    //     expect(component.dataSource).toEqual(new MatTableDataSource<Games>(game));
    // });

    it('should call create', inject([Router], (mockRouter: Router) => {
        const navigateSpy = spyOn(mockRouter, 'navigate').and.stub();
        component.create();
        expect(navigateSpy.calls.first().args[0]).toContain('/game/create');
        expect(gameCreationService.create).toHaveBeenCalled();
    }));

    it('should call modify', inject([Router], (mockRouter: Router) => {
        const game: Games = {
            id: '',
            name: '',
            description: '',
            time: 10,
            questions: [],
            lastModification: '',
            visible: false,
        };
        const navigateSpy = spyOn(mockRouter, 'navigate').and.stub();
        component.modify(game);
        expect(navigateSpy.calls.first().args[0]).toContain('/game/create');
        expect(gameCreationService.modify).toHaveBeenCalled();
    }));

    // it('should set login state to false while calling ngOnDestroy', () => {
    //     // const state = false;
    //     component.ngOnDestroy();
    //     expect(passwordService.setLoginState).toHaveBeenCalled();
    // });

    it('should toggle visibility', () => {
        const game: Games = {
            id: '',
            name: '',
            description: '',
            time: 10,
            questions: [],
            lastModification: '',
            visible: false,
        };
        component.toggleVisibility(game);
        expect(game.visible).toEqual(true);
    });

    it('should delete game', async () => {
        const game: Games = {
            id: '',
            name: '',
            description: '',
            time: 10,
            questions: [],
            lastModification: '',
            visible: false,
        };
        component.dataSource = new MatTableDataSource<Games>([game]);
        await component.deleteGame(game);
        expect(component.dataSource.data).toEqual([]);
    });
});
