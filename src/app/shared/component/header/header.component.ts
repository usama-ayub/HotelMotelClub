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
  isWishListDropdown:boolean = false;
  navMenu :Array<{name:string, path:string, child:Array<any>}> =[];
  authGarudPath = ['/create-product'];

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.initNav();
    this.authService.isAuth$.subscribe((res:boolean)=>{
      console.log(res);
      this.isAuth = res;
      if(!this.isAuth){
        this.navMenu[1].child = [];
        this.navMenu[1].child.push({name:'Login', path:'/login'});
        this.navMenu[1].child.push({name:'Register', path:'/register'});
      } else {
        this.navMenu[1].child = [];
        this.navMenu[1].child.push({name:'Create Product', path:'/create-product'});
        this.navMenu[1].child.push({name:'logout', path:'/logout'});
      }
    })
  }

  initNav():void {
    this.navMenu.push(
      {name:'Home', path:'/home', child:[]},
      {name:'My Account', path:'',child:[]},
      {name:'About Us', path:'/about',child:[]},
      {name:'Contact Us', path:'/contact',child:[]},
      {name:'FAQ', path:'/faq',child:[]},
      {name:'Policies', path:'/policy', child:[]},
      )
  }

  showWishList(): void{
    if(!this.isAuth){
      this.router.navigate(['/login']);
      return;
    }
    this.isWishListDropdown = !this.isWishListDropdown
  }
  wishListOutSideClick(event:any): void{
    this.isWishListDropdown = false;
  }
  
  logout() :void{
    this.authService.logout().subscribe((res:any)=>{
      if(this.authGarudPath.includes(this.router.url)){
         this.routeTo('/login')
      }
    })
  }
  routeTo(path:string) :void{
    if(path){
      if(path == '/logout'){
        this.logout();
      } else {
        this.router.navigate([path]);
      }
    }
  }
}
