import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';

const pokemonResponse = {
  'name': 'blastoise',
  'weight': 855,
  'sprites': {
      'back_female': null,
      'back_shiny_female': null,
      'back_default': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png',
      'front_female': null,
      'front_shiny_female': null,
      'back_shiny': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/9.png',
      'front_default': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
      'front_shiny': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/9.png'
  },
  'id': 9
};

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });

    pokemonService = TestBed.get(PokemonService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(pokemonService).toBeTruthy();
  });

  describe('findByName', () => {
    it('should return a pokemon with a valid name', () => {
      const pokemonName = 'Blastoise';
      let response;

      pokemonService.findByName(pokemonName).subscribe(res => {
        response = res;
      });

      http
        .expectOne('https://pokeapi.co/api/v2/pokemon/blastoise/')
        .flush(pokemonResponse);
      expect(response).toEqual(pokemonResponse);
      http.verify();
    });
  });
});
