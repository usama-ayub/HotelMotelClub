import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { ProductComponent } from './component/product/product.component';
// Filter
import { FilterPipe } from './pipes/filterBy.pipe';
// Directive
import { DigitOnlyDirective } from './directive/digit-only.directive';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent,
    ProductComponent,
    FilterPipe,
    DigitOnlyDirective
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent,
    ProductComponent,
    FilterPipe,
    DigitOnlyDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
