// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { CommunicationService } from '@app/services/communication.service';
// import { Game } from '@common/Game';
// describe('CommunicationService', () => {
//     let httpMock: HttpTestingController;
//     let service: CommunicationService;
//     let baseUrl: string;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [HttpClientTestingModule],
//         });
//         service = TestBed.inject(CommunicationService);
//         httpMock = TestBed.inject(HttpTestingController);
//         // eslint-disable-next-line dot-notation -- baseUrl is private and we need access for the test
//         baseUrl = service['baseUrl'];
//     });

//     afterEach(() => {
//         httpMock.verify();
//     });

//     it('should be created', () => {
//         expect(service).toBeTruthy();
//     });

//     it('should return expected message (HttpClient called once)', () => {
//         const expectedMessage: Game = { name: 'Hello', description: 'World', time: 15 };

//         // check the content of the mocked call
//         service.basicGet().subscribe({
//             next: (response: Game[]) => {
//                 expect(response[0].name).toEqual(expectedMessage.name);
//                 expect(response[0].description).toEqual(expectedMessage.description);
//                 expect(response[0].time).toEqual(expectedMessage.time);
//             },
//             error: fail,
//         });

//         const req = httpMock.expectOne(`${baseUrl}/game/all`);
//         expect(req.request.method).toBe('GET');
//         // actually send the request
//         req.flush([expectedMessage]);
//     });

//     it('should not return any message when sending a POST request (HttpClient called once)', () => {
//         const sentMessage: Game = { name: 'Hello', description: 'World', time: 13 };
//         // subscribe to the mocked call
//         service.basicPost(sentMessage).subscribe({
//             // eslint-disable-next-line @typescript-eslint/no-empty-function
//         });

//         const req = httpMock.expectOne(`${baseUrl}/game/send`);
//         expect(req.request.method).toBe('POST');
//         // actually send the request
//         req.flush(sentMessage);
//     });

//     it('should not return any message when sending a PUT request (HttpClient called once)', () => {
//         const sentMessage: Game = { name: 'Hello', description: 'World', time: 15 };
//         // subscribe to the mocked call
//         service.basicPut(sentMessage).subscribe({
//             // eslint-disable-next-line @typescript-eslint/no-empty-function
//         });
//         const req = httpMock.expectOne(`${baseUrl}/game/name`);
//         expect(req.request.method).toBe('PUT');
//         // actually send the request
//         req.flush(sentMessage);
//     });

//     it('should handle http error safely', () => {
//         service.basicGet().subscribe({
//             next: (response: Game[]) => {
//                 expect(response).toBeUndefined();
//             },
//             error: fail,
//         });

//         const req = httpMock.expectOne(`${baseUrl}/game/all`);
//         expect(req.request.method).toBe('GET');
//         req.error(new ProgressEvent('Random error occurred'));
//     });
// });
