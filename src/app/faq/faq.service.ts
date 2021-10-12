import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { faq } from "./faq.model";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class FaqService {

    private faqs : faq[] =[
        {
            idQuestion: '1',
            question: 'How do I make a report?',
            answer: 'You need to go to the "reporte" tab on the menu and there you´ll find it'
        },
        {
            idQuestion: '2',
            question: 'Is there any way that I can see my most visited locations?',
            answer: 'Yes! thanks to the "favoritos" section you can save your favorite locations'
        },
        {
            idQuestion: '3',
            question: 'Can I pay my "parquimetro" through the app?',
            answer: 'Unluckily you cant, but we are constantly working to give you a better experience'
        }
    ];
    constructor() { }

    getFaqs(){
        return [...this.faqs];
    }

    getFaq(idFaq: string){
        return{...this.faqs.find((faq: faq)=>{
            return faq.idQuestion === idFaq
        })};
    }
}