import { Component, OnInit } from '@angular/core';
import { faq } from './faq.model';
import { FaqService } from './faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FAQPage implements OnInit {

  faqs: faq[];
  constructor(private faqsService: FaqService) { }

  ngOnInit() {
    this.faqs = this.faqsService.getFaqs();
  }

  ionViewWillEnter(){
    this.faqs = this.faqsService.getFaqs();
  }

}
