import { Component, OnInit } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';
import { NavController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  tab1: any = TabsPage;
  constructor(private navController: NavController, private navParams: NavParams) { }

  ngOnInit() {
  }

}
