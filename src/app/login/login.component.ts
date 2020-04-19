import {Component, OnInit, ViewChild} from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import {UserModel} from "../@core/domains/user.model";
import {Router} from "@angular/router";
import {ApiAuth} from "../@core/services/api.auth";
import {NgForm, Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit{//extends NbLoginComponent {

  errors: string[];
  messages: string[];
  user: UserModel;
  submitted: boolean;
  demo: boolean =false;
  loading: boolean;
  //@ViewChild(NgForm) form;

  //loginForm: FormGroup;
  isSubmitted  =  false;

  loginForm = new FormGroup({
  password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  email: new FormControl('', [Validators.required, Validators.email]),
});

  constructor(private authService: ApiAuth,private router: Router) {
  }


  ngOnInit() {
    let url = window.location.href;
    this.demo= url.indexOf("demo")>0;
    console.log("demo="+this.demo);


    this.user=new UserModel();
    this.user.email="";
    this.user.password="";
    this.user.username="";
    this.errors= [];
    this.messages= [];

    //for demo purpose call the login automatically
    if (this.demo==true) {
      this.user.email="demo@hinawi.com";//"demo@hinawi.com";
      this.user.password="Passw0rd!";//"Passw0rd!";
      this.login();
    }

  }

  get f(){
    return this.loginForm.controls;
  }

  login()
  {
    this.errors= [];
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      this.errors.push("Email and Password required!!");
      return;
    }

    localStorage.setItem('role','');
    localStorage.setItem('token','');
    this.errors= [];
    this.messages.push("conecting.....");
    this.loading = true; //use for spin

    this.user.email=this.loginForm.value.email;
    this.user.password=this.loginForm.value.password;

    console.log(this.user);

    try
    {
      this.user.username=this.user.email;
      this.authService.getIsAuthenticated(this.user).subscribe(data => {
          console.log(data);
          this.messages= [];
          this.errors= [];
          this.loading = false;
          if(data==null) {//.message=='Invalid User'
            //console.log(data.message);
            alert('Connection problem at this time !!');
            //this.errors.push("Invalid User");
          }else if(data.success!=null && data.success===false){ //(data.success==false){
            //alert(data.message);
            this.errors.push(data.message);
          }
          else if(data.success===true) {
            let tokenStr= 'Bearer '+data.result.token;
            localStorage.setItem('token', tokenStr);
            //localStorage.setItem('username',this.user.username);
            //this.loggedIn.next(true);
            // localStorage.setItem('token',data.result.userId);
            localStorage.setItem('userid',data.result.userId);
            localStorage.setItem('username',data.result.userName);
            localStorage.setItem('role',data.result.role);
            localStorage.setItem('companyName',data.result.companyName);
            this.router.navigate(['/pages/my-attendance']);//my-attendance dashboard
          }
          else {
            //alert('Connection problem at this time !');
            this.errors.push("Invalid User");
          }
        },error => this.handleEror(error)
      )
    }
    catch (e) {
      //console.log(e);
      alert('Connection problem at this time !!');
    }

  }

  handleEror(error){
    this.messages= [];
    this.errors.push('Connection problem at this time !');
    this.loading = false;
    //alert(error.message); // error path;
  }


  onNavigate(){
    //this.router.navigateByUrl("https://www.google.com");
    //window.location.href="http://hinawi2.dyndns.org:8181/demo/#/auth/login";
    window.location.href="https://demo.hinawionline.com";
  }

}
