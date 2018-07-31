import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PokemonService } from '../services/pokemon/pokemon.service';
import { UsersService } from '../services/users/users.service';
import { ViewUserComponent } from './view-user.component';

class MockActivatedRoute {
  snapshot = { params: { id: '2' } };
}

class MockUsersService {
  findOne(id) {
    return of({
      id: '2',
      name: 'Bob',
      role: 'Developer',
      pokemon: 'Charizard'
    });
  }
}

class MockPokemonService {
  findByName(name) {
    return of({
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
    });
  }
}

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;
  let usersService: UsersService;
  let pokemonService: PokemonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ViewUserComponent ]
    })
    .overrideComponent(ViewUserComponent, {
      set: {
        providers: [
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: UsersService, useClass: MockUsersService },
          { provide: PokemonService, useClass: MockPokemonService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    usersService = fixture.debugElement.injector.get(UsersService);
    pokemonService = fixture.debugElement.injector.get(PokemonService);
    spyOn(usersService, 'findOne').and.callThrough();
    spyOn(pokemonService, 'findByName').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a user id from the activated route', () => {
    expect(component.userId).toEqual('2');
  });

  it('should initialize a call to get the current user', () => {
    expect(usersService.findOne).toHaveBeenCalled();
  });

  it('should initialize with a call to get the user\'s favorite pokemon', () => {
    expect(pokemonService.findByName).toHaveBeenCalled();
  });

  it('should display a pokemon image', () => {
    const image = fixture.debugElement.query(By.css('.image img'));
    expect(image.properties.src).toContain('.png');
  });
});
