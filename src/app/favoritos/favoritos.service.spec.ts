import { TestBed } from "@angular/core/testing";

import { FavoritosService } from './favoritos.service';

describe('FavoritoService', ()=> {
    let service: FavoritosService;

    beforeEach(()=> {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FavoritosService);
    });

    it('Should be created', ()=> {
        expect(service).toBeTruthy();
    });
});