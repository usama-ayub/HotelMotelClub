import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Component
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { ProductComponent } from './component/product/product.component';

// Filter
import { FilterPipe } from './pipes/filterBy.pipe';

// Directive
import { DigitOnlyDirective } from './directive/digit-only.directive';
import { ClickOutSideDirective } from './directive/click-outside.directive';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent,
    ProductComponent,
    FilterPipe,
    DigitOnlyDirective,
    ClickOutSideDirective
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent,
    ProductComponent,
    FilterPipe,
    DigitOnlyDirective,
    ClickOutSideDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
