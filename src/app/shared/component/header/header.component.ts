import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth:boolean = false;
  isAccountDropdown:boolean = false;
  isLanguageDropdown:boolean = false;
  isWishListDropdown:boolean = false;

  navMenu :Array<{name:string, path:string}> =[];

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.initNav();
    this.authService.isAuth$.subscribe((res:boolean)=>{
      console.log(res);
      this.isAuth = res;
    })
  }

  initNav():void {
    this.navMenu.push(
      // {name:'Home', path:'/home'},
      {name:'Product', path:'/product-list'},
      {name:'Contact Us', path:'/contact'},
      {name:'About Us', path:'/about'},
      )
  }

  showAccountDropdown() : void{
    this.isLanguageDropdown = false;
    this.isAccountDropdown = !this.isAccountDropdown
  }
  showLanguageDropdown(): void{
    this.isAccountDropdown = false
    this.isLanguageDropdown = !this.isLanguageDropdown
  }
  showWishList(): void{
    if(!this.isAuth){
      this.router.navigate(['/account']);
      return;
    }
    this.isWishListDropdown = !this.isWishListDropdown
  }
  wishListOutSideClick(event:any): void{
    this.isWishListDropdown = false;
  }
  languageOutSideClick(event:any): void{
    this.isLanguageDropdown = false;
  }
  accountOutSideClick(event:any): void{
    this.isAccountDropdown = false;
  }
  
  logout(){
    this.authService.logout().subscribe((res:any)=>{
      console.log(res);
    })
  }
  routeTo(path:string){
    this.router.navigate([path]);
  }
}
