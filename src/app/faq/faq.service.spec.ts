import { TestBed } from "@angular/core/testing";

import { FaqService } from './faq.service';

describe('FaqsService', ()=> {
    let service: FaqService;

    beforeEach(()=> {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FaqService);
    });

    it('Should be created', ()=> {
        expect(service).toBeTruthy();
    });
});