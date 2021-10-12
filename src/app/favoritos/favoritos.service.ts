import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { favoritos } from "./favoritos.model";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class FavoritosService {

    private favorito : favoritos[] =[
        {
            id: '1',
            location: 'HEB Gonzalitos',
            km: '2 km away'
        },
        {
            id: '2',
            location: 'Plaza San Agustin',
            km: '13 km away'
        },
        {
            id: '3',
            location: 'Universidad Autonoma de Nuevo León',
            km: '30km away'
        }
    ];
    constructor() { }

    getFavorito(){
        return [...this.favorito];
    }

    getFavoritos(idFavoritos: string){
        return{...this.favorito.find((favoritos: favoritos)=>{
            return favoritos.id === idFavoritos
        })};
    }
}