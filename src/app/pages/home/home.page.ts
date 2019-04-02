import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  client: any = {
    name: "",
    email: "",
    phone: "",
    status: ""
  };

  constructor(public router: Router, public storage: Storage) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get("client").then((data: any) => {
      this.client = data;
    });
  }

  openRegister() {
    //alert('openRegister');
    this.router.navigateByUrl("/register");
  }

  openBooking() {
    //alert('openBooking');
    this.router.navigateByUrl("/booking");
  }
}
