import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { AuthComponent } from './component/auth/auth.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { CreateProductComponent } from './component/create-product/create-product.component';
import { NoAuthGuard } from './core/guard/no-auth/no-auth.guard';
import { AuthGuard } from './core/guard/auth/auth.guard';
import { FaqComponent } from './component/faq/faq.component';
import { TermConditionComponent } from './component/term-condition/term-condition.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { SettingComponent } from './component/setting/setting.component';
import { FavouriteComponent } from './component/favourite/favourite.component';
import { MyAdsComponent } from './component/my-ads/my-ads.component';


const routes: Routes = [
  {path: '', component: ProductListComponent},
  // {path: 'product-list', component: ProductListComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'create-product', component: CreateProductComponent, canActivate: [AuthGuard]},
  {path: 'update-ads/:id', component: CreateProductComponent, canActivate: [AuthGuard]},
  {path: 'setting', component: SettingComponent, canActivate: [AuthGuard]},
  {path: 'favourite', component: FavouriteComponent, canActivate: [AuthGuard]},
  {path: 'ads', component: MyAdsComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutUsComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'policy', component: TermConditionComponent},
  {path: 'account', component: AuthComponent, canActivate: [NoAuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard]},
  {path: 'error', component: NotFoundComponent},
  {path: 'welcome', component: WelcomeComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
