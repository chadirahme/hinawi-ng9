import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiAuth} from "../../@core/services/api.auth";
import {MobileAttendance} from "../../@core/domains/webdashboard.model";
import {DatePipe} from "@angular/common";
import {WsTopic} from "../../@core/services/ws.topic";
import {Router} from "@angular/router";
import {NbDialogService} from "@nebular/theme";
import {ShowcaseDialogComponent} from "../../@theme/dialog/showcase-dialog.component";

@Component({
  selector: 'my-attendance',
  templateUrl: './my-attendance.component.html',
  styleUrls: ['./my-attendance.component.scss']
})
export class MyAttendanceComponent implements OnInit {

  keyword = 'name';
  customersList: any[];
  selectedCustomer: any;
  selectedCustomerName: any;
  type: string;
  mobileAttendance: MobileAttendance;
  oldMobileAttendance: MobileAttendance;
  selectedStatus: string;
  note: string;
  hadCheckOut: boolean;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  public lat;
  public lng;
  lastActivity: string;
  attendanceReasonList: any[];
  selectedReason: any;
  selectedReasonDesc: any;
  demo: boolean =false;
  customerInfo: any;
  recNo: any;

  constructor(private authService: ApiAuth, private datePipe: DatePipe,
               private wsTopic: WsTopic,private router: Router,private dialogService: NbDialogService)
  {
    //this._pushNotifications.requestPermission();
    //this._notificationService.requestPermission();
  }

  //used with auto complete text
  selectEvent(item) {
    console.log(item);
    // do something with selected item
    var info = item;
    this.selectedCustomer = info.name;
    this.customerInfo = "Contact person: ";
    console.log(info);
    if(this.type === 'Prospective'){
      this.recNo=info.recNo;
      this.customerInfo += info.contact + " | " ;
      this.customerInfo+=`<a href="https://web.whatsapp.com/send?phone=${info.telephone1}&text=Hi, I contacted you Through HinawiOnline."
      data-text="Take a look at this awesome website:" class="wa_btn wa_btn_s"
      target="_blank"
        >${info.telephone1}</a>`;
    }
    if(this.type === 'Vendor' || this.type === 'Customer'){
      this.customerInfo += info.contact + " | ";
      this.customerInfo+=`<a href="https://web.whatsapp.com/send?phone=${info.phone}&text=Hi, I contacted you Through HinawiOnline."
      data-text="Take a look at this awesome website:" class="wa_btn wa_btn_s"
      target="_blank"
        >${info.phone}</a>`;
    }

  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }

  ngOnInit() {
    let url = window.location.href;
    this.demo= url.indexOf("demo")>0;
    this.demo=true;
    this.selectedReason=0;
    this.type = "Customer";
    this.loadAttendanceReasonList();
    this.checkIfUserCheckedIn();
   // this.loadInitData();
    if(this.demo)
    this.getLocation();
  }

  loadAttendanceReasonList(): void {
    try {
      this.authService.getHRListValues(159).subscribe(data => {
        this.attendanceReasonList = data.result;
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  changeReason($event){
    this.selectedReasonDesc = $event.target.options[$event.target.options.selectedIndex].text;
    console.log(this.selectedReasonDesc);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            console.log("Latitude: " + position.coords.latitude +
              "Longitude: " + position.coords.longitude);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lat);

            var mapProp = {
              center: new google.maps.LatLng(this.lat, this.lng),
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

          }
        },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  //customerName":"987 gulf","customerType":"Customer","checkinNote":"Morning check in","checkoutNote":"Morning check in","checkinTime":"2020-02-16 16:53:43"

     checkIfUserCheckedIn():void{
    try {
      this.authService.findLastUserVisit(+localStorage.getItem('userid')).subscribe(data => {
        this.oldMobileAttendance=data.result;
        let reasonDesc="";
        if(this.oldMobileAttendance){
           reasonDesc=this.oldMobileAttendance.reasonDesc;
          if(this.oldMobileAttendance.checkoutTime!=null) {
            reasonDesc=this.oldMobileAttendance.checkoutReasonDesc;
            this.lastActivity = "Check Out at :" +this.datePipe.transform(this.oldMobileAttendance.checkoutTime, 'dd/MM/yyyy h:mm:ss a');
            this.hadCheckOut=true;
            this.loadInitData();
          }
          else {

            this.lastActivity = "Check In at :" + this.datePipe.transform(this.oldMobileAttendance.checkinTime, 'dd/MM/yyyy h:mm:ss a');
            this.type = this.oldMobileAttendance.customerType;
            this.callType(this.type);
            this.selectedCustomer=this.oldMobileAttendance.customerName;
            this.selectedCustomerName=this.oldMobileAttendance.customerName;
            this.selectedReason=23;
            this.selectedReasonDesc="Moving In \\ Out (Transportation)";
            //if(this.type=='Prospective'){
              //this.loadProspectiveData();
            //}

          }
          this.lastActivity += " | " + this.oldMobileAttendance.customerType+ " : " + this.oldMobileAttendance.customerName;
          this.lastActivity +="<br/>" + "Reason : " + reasonDesc;

        }else{//if user first time enter
          this.loadInitData();
        }
      });

    }
    catch (e) {
      console.log(e);
    }
  }


  loadInitData(): void {
    try {
      this.authService.getCustomersList().subscribe(data => {
        this.customersList=data.result;
        //this.selectedCustomer=0;
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  loadVendorData(): void {
    try {
      this.authService.getVendorsList().subscribe(data => {
        this.customersList=data.result;
        //this.selectedCustomer=0;
      });

    }
    catch (e) {
      console.log(e);
    }
  }
  loadProspectiveData(): void {
    try {
      this.authService.getProspectiveSortedList().subscribe(data => {
        this.customersList=data.result;
        //this.selectedCustomer=0;
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  callType(value){
    //console.log(value);
    this.selectedCustomerName="";
    this.customerInfo="";
    this.type=value;
    //this.order.type=value; Customer Prospective Vendor
    if(value === 'Customer'){
      this.loadInitData();
    }else if(value === 'Vendor'){
      this.loadVendorData();
    }else if(value === 'Prospective'){
      this.loadProspectiveData();
    }
  }




  public setSelectedStatus($event): void {
    console.log($event.target.options.selectedIndex);
    //this.selectedReasonDesc = $event.target.options[$event.target.options.selectedIndex].text;
    var info = this.customersList[$event.target.options.selectedIndex - 1]; //-1 because I add select as first item
    this.customerInfo = "Contact person: ";
    console.log(info);
    if(this.type === 'Prospective'){
      this.customerInfo += info.contact + " | " ;
      this.customerInfo+=`<a href="https://web.whatsapp.com/send?phone=${info.telephone1}&text=Hi, I contacted you Through HinawiOnline."
      data-text="Take a look at this awesome website:" class="wa_btn wa_btn_s"
      target="_blank"
        >${info.telephone1}</a>`;
    }
    if(this.type === 'Vendor' || this.type === 'Customer'){
      this.customerInfo += info.contact + " | ";
      this.customerInfo+=`<a href="https://web.whatsapp.com/send?phone=${info.phone}&text=Hi, I contacted you Through HinawiOnline."
      data-text="Take a look at this awesome website:" class="wa_btn wa_btn_s"
      target="_blank"
        >${info.phone}</a>`;
    }

    //this.selectedStatus = $event.target.options.selectedIndex;
  }

  submit(){
   //this.notify("Check Out");
    console.log(this.selectedCustomer);

    //check if last this.oldMobileAttendance.checkinTime before now

    let MMddyyyy2 = this.datePipe.transform(new Date(),"yyyy-MM-dd HH:mm:ss");

    console.log(this.oldMobileAttendance.checkinTime);
    console.log(MMddyyyy2);
    if(this.oldMobileAttendance.checkinTime > MMddyyyy2){
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Wrong Check-In Time !!',
          message: 'You already had a Check-In after the current time !!',
          status:  'warning'
        },
      });
      return;
    }

    //if(this.hadCheckOut) {
      if (!this.selectedCustomer || this.selectedCustomer == "0") {
        this.dialogService.open(ShowcaseDialogComponent, {
          context: {
            title: 'Missing Data !!',
            message: 'Please select the name who you want to work for at this time !!',
            status:  'warning'
          },
        });
        return;
      }
      if (!this.selectedReason || this.selectedReason == "0") {
        this.dialogService.open(ShowcaseDialogComponent, {
          context: {
            title: 'Missing Data !!',
            message: 'Please select CheckIn Attendance Reason !!',
            status:  'warning'
          },
        });
        return;
      }

    if(!this.note){
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Missing Data !!',
          message: 'Please enter your CheckIn Reason or Result !!',
          status:  'warning'
        },
      });
      return;
    }

    this.mobileAttendance=new MobileAttendance();
    this.mobileAttendance.userId=+localStorage.getItem('userid');
    this.mobileAttendance.userName=localStorage.getItem('username');//"chadi";
    this.mobileAttendance.recNo=this.recNo;
    this.mobileAttendance.customerType=this.type;
    this.mobileAttendance.customerName= this.selectedCustomer ;//"Customer1";
    this.mobileAttendance.checkinNote=this.note;
    this.mobileAttendance.checkinLatitude=this.lat;
    this.mobileAttendance.checkinLongitude=this.lng;
    this.mobileAttendance.reasonId=this.selectedReason;
    this.mobileAttendance.reasonDesc=this.selectedReasonDesc;

    //this.mobileAttendance.checkinTime = Date.now();
    // let d = new Date();
    // let utc = d.getTime(); //- (d.getTimezoneOffset() * 60000);
    // let nd = new Date(utc);



    let MMddyyyy = this.datePipe.transform(new Date(),"yyyy-MM-ddTHH:mm:ss");
    this.mobileAttendance.localCheckinTime =MMddyyyy;   //new Date();//.toLocaleString();//.slice(0, 19).replace('T', ' '); //Date.now();

    this.authService.addMobileAttendance(this.mobileAttendance).subscribe(data => {
      console.log(data);
      //this.notify("Check In");
      //alert(data.message);
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Checkin Attendance Saved!!',
          message: data.message,
          status:  'success'
        },
      }).onClose.subscribe((result: any) => this.refresh());

      //this.wsTopic.sendAttendance(this.mobileAttendance);
      //this.refresh();

     // this.mobileAttendance=new MobileAttendance();
     // this.note="";
     // this.selectedCustomer=0;
    });
  }

  submitCheckOut(){
    //check if last this.oldMobileAttendance.checkinTime before now
    let MMddyyyy2 = this.datePipe.transform(new Date(),"yyyy-MM-dd HH:mm:ss");
    if(this.oldMobileAttendance.checkinTime > MMddyyyy2){
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Wrong Check-Out Time !!',
          message: 'You already had a Check-In after the current time !!',
          status:  'warning'
        },
      });
      return;
    }

    if (!this.selectedReason || this.selectedReason == "0") {
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Missing Data !!',
          message: 'Please select CheckOut Attendance Reason !!',
          status:  'warning'
        },
      });
      return;
    }
    if(!this.note){
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Missing Data !!',
          message: 'Please enter your CheckOut Reason or Result !!',
          status:  'warning'
        },
      });
      return;
    }
    this.mobileAttendance=new MobileAttendance();
    this.mobileAttendance.userId=+localStorage.getItem('userid');
    this.mobileAttendance.userName=localStorage.getItem('username');//"chadi";
    this.mobileAttendance.customerType=this.type;
    this.mobileAttendance.customerName= this.selectedCustomer ;
    this.mobileAttendance.checkoutNote=this.note;
    this.mobileAttendance.checkoutLatitude=this.lat;
    this.mobileAttendance.checkoutLongitude=this.lng;
    this.mobileAttendance.reasonId=this.selectedReason;
    this.mobileAttendance.reasonDesc=this.selectedReasonDesc;
    //this.mobileAttendance.checkinTime = Date.now();
    let MMddyyyy = this.datePipe.transform(new Date(),"yyyy-MM-ddTHH:mm:ss");
    this.mobileAttendance.localCheckinTime = MMddyyyy;


    this.authService.addMobileAttendance(this.mobileAttendance).subscribe(data => {
      console.log(data);
      //this.notify("Check Out");
      //alert(data.message);
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Checkout Attendance Saved!!',
          message: data.message,
          status:  'success'
        },
      }).onClose.subscribe((result: any) => this.refresh());
      //this.wsTopic.sendAttendance(this.mobileAttendance);
      //this.refresh();
     // this.mobileAttendance=new MobileAttendance();
     // this.note="";
     // this.selectedCustomer=0;
      //this.dialogRef.close(data.message);
    });

  }

   options = {
    position: ["middle", "center"],
    timeOut: 5000,
     showProgressBar: true,
     pauseOnHover: true,
     clickToClose: true,
     icon: "assets/images/logo.jpg",
     animate: 'scale'
   };

  refresh(){
    //this.router.navigate(["/#/pages/my-attendance"]);
    //this.ngOnInit();
    this.wsTopic.sendAttendance(this.mobileAttendance);
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

    let currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }


  // notify(type){ //our function to be called on click
  //   let options = { //set options
  //     body: localStorage.getItem('username') + " " + type + " for " +this.selectedReasonDesc + " "+this.selectedCustomer,
  //     icon: "assets/images/logo.jpg" //adding an icon
  //   }
  //   // var n  =this._pushNotifications.create('User Attendance', options).subscribe( //creates a notification
  //   //   res => console.log(res),
  //   //   err => console.log(err)
  //   // );
  //   //setTimeout(n.close.bind(n), 9000);
  //   // let data: Array < any >= [];
  //   // data.push({
  //   //   'title': 'Approval',
  //   //   'alertContent': 'This is First Alert -- By Debasis Saha'
  //   // });
  //
  //   let content=localStorage.getItem('username') + " " + type + " for " +this.selectedReasonDesc + " "+this.selectedCustomer;
  //   //this._notifications.create('User Attendance', 'content', 'success', options);
  //   const toast = this._notifications.success('Attendance created!', content);
  //   //this._notificationService.generateNotification(data);
  //
  //   toast.click.subscribe((event) => {
  //     //alert(event)
  //     //reload my component
  //   });
  // }
}
