import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon/pokemon.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  userId;
  user;
  pokemon;
  loading;
  isMissingPokemon;

  constructor(private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private pokemonService: PokemonService) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.userId = params['id'];
    this.loading = true;
    this.getUser(this.userId);
    this.getPokemon(this.user.pokemon);
  }

  getUser(id) {
    this.usersService.findOne(id).subscribe(res => {
      this.user = res;
    });
  }

  getPokemon(pokemon) {
    this.pokemonService.findByName(pokemon).subscribe(res => {
      this.loading = false;
      this.pokemon = res;
    }, err => {
      this.loading = false;
      this.isMissingPokemon = true;
    });
  }

}
