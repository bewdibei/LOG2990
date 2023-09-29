// import { HttpClientModule, HttpResponse } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { CommunicationService } from '@app/services/communication.service';
// import { Game } from '@common/Game';
// import { of } from 'rxjs';
// import { GameCreationService } from './gamecreation.service';
// import SpyObj = jasmine.SpyObj;

// describe('GameCreationService', () => {
//     let service: GameCreationService;
//     // let fixture: ComponentFixture<GameCreationService>;
//     let communicationServiceSpy: SpyObj<CommunicationService>;
//     const timeright = 16;
//     const timefalse = 5;

//     beforeEach(() => {
//         communicationServiceSpy = jasmine.createSpyObj('GameCreationService', ['basicPost', 'basicPut']);
//         communicationServiceSpy.basicPost.and.returnValue(of(new HttpResponse<string>({ status: 201, statusText: 'Created' })));
//         communicationServiceSpy.basicPut.and.returnValue(of(new HttpResponse<string>({ status: 200, statusText: 'Ok' })));

//         // check the content of the mocked call

//         TestBed.configureTestingModule({
//             imports: [RouterTestingModule, HttpClientModule],

//             providers: [{ provide: CommunicationService, useValue: communicationServiceSpy }],
//         });
//         service = TestBed.inject(GameCreationService);
//     });

//     it('should be created', () => {
//         expect(service).toBeTruthy();
//     });
//     it("should have as title 'LOG2990'", () => {
//         expect(service.gameList).toEqual([]);
//     });

//     it('should timenamevalide', () => {
//         const right = service.isTimeValid(timeright);
//         expect(right[0]).toEqual('Tout est correct');
//         expect(right[1]).toEqual(true);
//     });

//     it('should timenameinvalide', () => {
//         const right = service.isTimeValid(timefalse);
//         expect(right[0]).toEqual('Mettez un chiffre entre 10 et 60');
//         expect(right[1]).toEqual(false);
//     });

//     it('should namevide', () => {
//         const right = service.isNameValid('');
//         expect(right[0]).toEqual('Mettez un nom valable');
//         expect(right[1]).toEqual(false);
//     });

//     it('should namecorrecte', () => {
//         service.gameList = [{ name: 'Hello', description: 'World', time: 15 }];
//         const right = service.isNameValid('yo');
//         expect(right[0]).toEqual('Correct');
//         expect(right[1]).toEqual(true);
//     });

//     it('should nameincorrecte', () => {
//         service.gameList = [{ name: 'Hello', description: 'World', time: 15 }];
//         const right = service.isNameValid('Hello');
//         expect(right[0]).toEqual('Le nom doit etre unique');
//         expect(right[1]).toEqual(false);
//     });

//     it('should call basicPost when calling getMessagesFromServer', () => {
//         const expectedMessage: Game = { name: 'Hello', description: 'World', time: 15 };
//         service.sendToServer(expectedMessage);
//         expect(communicationServiceSpy.basicPost).toHaveBeenCalled();
//     });
//     it('should call basicPut when calling getMessagesFromServer', () => {
//         const expectedMessage: Game = { name: 'Hello', description: 'World', time: 15 };
//         service.putToServer(expectedMessage);
//         expect(communicationServiceSpy.basicPut).toHaveBeenCalled();
//     });

//     it('should call set', () => {
//         const expectedMessage: Game = { name: 'Hello', description: 'World', time: 15 };
//         service.games = [{ name: 'Hello', description: 'World', time: 15 }];
//         expect(service.gameList[0]).toEqual(expectedMessage);
//     });

//     it('should call set edit', () => {
//         service.edit = true;
//         expect(service.edit).toEqual(true);
//     });

//     it('should call get edit', () => {
//         expect(service.edit).toEqual(false);
//     });

//     it('should call creer()', () => {
//         service.create();
//         expect(service.edit).toEqual(false);
//     });

//     it('should call modifier()', () => {
//         service.modify();
//         expect(service.edit).toEqual(true);
//     });

//     // it('should handle basicPost that returns a valid HTTP response', () => {
//     //     const expectedMessage: Game = { name: 'Hello', description: 'World', time: 15 };
//     //     service.sendToServer(expectedMessage);
//     //     expect(service.gameList[0]).toEqual(expectedMessage);
//     // });

//     // it('should handle basicPut that returns a valid HTTP response', () => {
//     //     service.gameList=[{ name: 'Hello', description: 'World', time: 15 }]
//     //     const expecte: Game = { name: 'Hello', description: 'w', time: 14 };
//     //     service.putToServer(expecte);
//     //     expect(service.gameList[0]).toEqual(expecte);
//     // });
// });
