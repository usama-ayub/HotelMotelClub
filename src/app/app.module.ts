import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProductComponent } from './shared/product/product.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { AuthComponent } from './component/auth/auth.component';
import { HomeComponent } from './component/home/home.component';
import { FaqComponent } from './component/faq/faq.component';
import { TermConditionComponent } from './component/term-condition/term-condition.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { CreateProductComponent } from './component/create-product/create-product.component';
import { SettingComponent } from './component/setting/setting.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    ProductDetailComponent,
    AboutUsComponent,
    ContactUsComponent,
    AuthComponent,
    HomeComponent,
    FaqComponent,
    TermConditionComponent,
    NotFoundComponent,
    BreadcrumbComponent,
    CreateProductComponent,
    SettingComponent,
    ProductListComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
