import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  findByName(name): Observable<any> {
    const pokemon = name.toLowerCase();
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
  }
}
