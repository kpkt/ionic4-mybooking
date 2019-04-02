import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import {
  LoadingController,
  ToastController,
  NavController
} from "@ionic/angular";
import { Storage } from '@ionic/storage';

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  data: FormGroup;

  //Declare form validation messages
  validation_messages = {
    name: [
      { type: "required", message: "Name is required." },
      { type: "pattern", message: "Special string not allow." },
      { type: "minlength", message: "Name to short." },
      { type: "maxlength", message: "Name to long." }
    ],
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "E-mel invalid format." }
    ],
    phone: [
      { type: "required", message: "Phone is required." },
      { type: "minlength", message: "Phone to short." },
      { type: "maxlength", message: "Phone to long." },
      { type: "pattern", message: "Phone invalid format." }
    ]
  };

  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.data = new FormGroup({
      name: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(45),
          Validators.pattern("^[a-zA-Z@' ]+$")
        ])
      ),
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      phone: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern("^[0-9]+$")
        ])
      ),
      status: new FormControl("1")
    });
  }

  ngOnInit() {}

  async doRegister(data?: any) {
    //data guna di sini
    const loading = await this.loadingCtrl.create({
      message: "Please wait...",
      duration: 3000
    });
    await loading.present();

    const status = await loading.onDidDismiss();

    if (status) {
      //call services do submit ke server
      const toast = await this.toastCtrl.create({
        message: "Data have been saved.",
        position: "top",
        duration: 2000
      });

      toast.present();
      this.storage.set('client', data);
      this.navCtrl.navigateRoot("/home");
      console.log(data);


    }
  }
}
