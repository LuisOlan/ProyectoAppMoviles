import { Component, OnInit } from '@angular/core';
import { FAQPage } from '../faq/faq.page';
import { FavoritosPage } from '../favoritos/favoritos.page';
import { ReportePage } from '../reporte/reporte.page';
import { NavController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html'
})
export class TabsPage implements OnInit {

  tab1: any = FavoritosPage;
  tab2: any = ReportePage;
  tab3: any = FAQPage;
  constructor(private navController: NavController, private navParams: NavParams) { }

  ngOnInit() {
  }

}
