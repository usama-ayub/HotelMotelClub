import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAccountDropdown:boolean = false;
  isLanguageDropdown:boolean = false;
  isWishListDropdown:boolean = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
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
  
  
  routeTo(path:string){
    this.router.navigate([path]);
  }
}
