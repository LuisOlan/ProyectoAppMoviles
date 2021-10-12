import { Component, OnInit } from '@angular/core';
import { favoritos } from './favoritos.model';
import { FavoritosService } from './favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  favorito: favoritos[];
  constructor(private favoritoService: FavoritosService) { }

  ngOnInit() {
    this.favorito = this.favoritoService.getFavorito();
  }

  ionViewWillEnter(){
    this.favorito = this.favoritoService.getFavorito();
  }

}
