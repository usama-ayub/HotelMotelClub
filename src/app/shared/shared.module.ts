import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
//Component
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { ProductComponent } from './component/product/product.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { ProductAltComponent } from './component/product-alt/product-alt.component';

// Filter
import { FilterPipe } from './pipes/filterBy.pipe';

// Directive
import { DigitOnlyDirective } from './directive/digit-only.directive';
import { ClickOutSideDirective } from './directive/click-outside.directive';

// Service
import {MessageService} from 'primeng/api';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent,
    ProductComponent,
    PaginationComponent,
    FilterPipe,
    DigitOnlyDirective,
    ClickOutSideDirective,
    PaginationComponent,
    ProductAltComponent
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent,
    ProductComponent,
    PaginationComponent,
    ProductAltComponent,
    FilterPipe,
    DigitOnlyDirective,
    ClickOutSideDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    ToastModule
  ],
  providers:[
    MessageService
  ]
})
export class SharedModule { }
