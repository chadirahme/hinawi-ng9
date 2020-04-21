import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {Router} from "@angular/router";
import {WsTopic} from "../../../@core/services/ws.topic";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  userName:string;
  battleInit: number;
  customers: any[];
  companyName: string;
  subscription: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  //userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  userMenu = [  { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router,private wsTopic: WsTopic,private _notifications: NotificationsService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    });

    this.user.name =localStorage.getItem('username');
    this.companyName=localStorage.getItem("companyName");

    if(this.subscription==null) {
      this.subscription = this.wsTopic.attendanceResult.subscribe(msg => {
        console.log("attendanceResult.subscribe");
        this.notifyUser(msg);
      });
    }
  }

  notifyUser(msg): void{
    let content=localStorage.getItem('username') + " checkIn";
    //this._notifications.create('User Attendance', 'content', 'success', options);
    //msg="123" + "<br/>" + "456" + "<br/>" + "789" + "<br/>" + "101112..."
    const toast = this._notifications.success('Attendance created!', msg );

    //this._notificationService.generateNotification(data);

    var audio = new Audio('assets/images/sms-alert.mp3');
    audio.play();

    this.subscription.unsubscribe();

    // toast.click.subscribe((event) => {
    //   //alert(event)
    //   //reload my component
    // });
  }

  options = {
    position: ["bottom", "right"],
    timeOut: 9000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    animate: 'scale'
  };

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    this.destroy$.next();
    this.destroy$.complete();

  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      // Do something on Log out
      console.log('Log out Clicked ');
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
      localStorage.removeItem('username');
      this.router.navigate(['auth/login']);

    } else if ( title === 'Attendance' ) {
      // Do something on Profile
      console.log('Profile Clicked ')
      //this.openWindow1();
    }
  }
}
