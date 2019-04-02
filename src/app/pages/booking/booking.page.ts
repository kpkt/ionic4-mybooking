import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import {
  ToastController,
  LoadingController,
  NavController
} from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.page.html",
  styleUrls: ["./booking.page.scss"]
})
export class BookingPage implements OnInit {
  room: FormGroup;

  client: any = {
    name: "",
    email: "",
    phone: "",
    status: ""
  };

  rooms: any = [
    { text: "Panoramic Room", capacity: "12", value: 1 },
    { text: "Small Conference Room", capacity: "20", value: 2 },
    { text: "Large Conference Room", capacity: "1402", value: 3 }
  ];

  equipments: any = [
    { text: "Projector & Screen", status: 1, value: 1 },
    { text: "Wi-Fi", status: 1, value: 2 },
    { text: "Flipchart", status: 1, value: 3 },
    { text: "Video Conferencing", status: 1, value: 4 },
    { text: "TV", status: 1, value: 5 },
    { text: "Printer", status: 0, value: 6 }
  ];

  //Declare form validation messages
  validation_messages = {
    room_id: [{ type: "required", message: "Room is required." }],
    attendees: [{ type: "required", message: "Attendee is required." }],
    start: [{ type: "required", message: "Start Date is required." }],
    end: [{ type: "required", message: "End Date is required." }],
    notes: [{ type: "required", message: "Notes is required." }]
  };

  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.room = new FormGroup({
      email: new FormControl(""),
      room_id: new FormControl(""),
      attendees: new FormControl("", Validators.compose([Validators.required])),
      start: new FormControl(""),
      end: new FormControl(""),
      notes: new FormControl("", Validators.compose([Validators.required])),
      equipment_id: new FormControl("")
    });
  }

  ionViewWillEnter() {
    this.storage.get("client").then((data: any) => {
      this.client = data;
    });
  }

  ngOnInit() {}

  async doBooking(data?: any) {
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

      this.storage.get("booking").then((booking: any) => {
        if (booking) {
          booking.push(data);
        } else {
          const booking: any = [];
          this.storage.set("booking", booking.push(data));
        }
      });

      this.navCtrl.navigateRoot("/home");
      //PHP echo date("d-m-Y", 1554220349700/1000)      
      data["email"] = this.client.email;
      data["start"] = new Date(data["start"]).getTime();
      data["end"] = new Date(data["end"]).getTime();
      console.log("doBooking", data);
    }
  }
}
