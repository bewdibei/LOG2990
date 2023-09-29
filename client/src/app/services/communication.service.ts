import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '@app/interfaces/definitions';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})

// communication serveur client
export class CommunicationService {
    private readonly baseUrl: string = environment.serverUrl;

    constructor(private readonly http: HttpClient) {}

    basicGet(): Observable<Game[]> {
        return this.http.get<Game[]>(`${this.baseUrl}/game/all`).pipe(catchError(this.handleError<Game[]>('basicGet')));
    }

    basicPost(message: Game): Observable<HttpResponse<string>> {
        return this.http.post(`${this.baseUrl}/game/send`, message, { observe: 'response', responseType: 'text' });
    }

    basicPut(message: Game): Observable<HttpResponse<string>> {
        console.log(' basicPut modif test');
        return this.http.put(`${this.baseUrl}/game/${message.name}`, message, { observe: 'response', responseType: 'text' });
    }

    basicDelete(url: string): Observable<void> {
        return this.http.delete<void>(this.baseUrl + url).pipe(catchError(this.handleError<void>('basicDelete')));
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return () => of(result as T);
    }
}
