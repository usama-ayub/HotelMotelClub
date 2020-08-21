import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ICategory } from 'src/app/interface/category';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
 
 
  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '15rem',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: '100%',
    minWidth: '0',
    placeholder: 'Enter text here...',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'subscript',
        'superscript',
        'bold', 'italic', 'underline', 'strikeThrough', 'insertUnorderedList',
        'undo',
        'redo',
        'indent',
        'fontName',
        'outdent',
        'insertOrderedList'],
      ['fontSize', 'insertImage',
        'toggleEditorMode',
        'textColor',
        'insertHorizontalRule',
        'backgroundColor',
        'link',
        'unlink',
        'insertVideo']
    ]
  };
  productForm: FormGroup;
  submittedProduct: boolean = false;
  isRequestProduct: boolean = false;
  categoryArray: Array<ICategory> = []
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    ) { }

  ngOnInit(): void {
    this.productFormInit();
    this.getCategory();
  }

  productFormInit(): void {
    this.productForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      title: ['', [Validators.required]],
      category: [null, [Validators.required]],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      subcategory: [''],
      price: ['', [Validators.required, Validators.min(2)]],
      imageurl: [[], [Validators.required]],
    });
    this.productForm.get('category').valueChanges.subscribe(value => {
      let index = this.categoryArray.findIndex((res)=> {
        return res.categoryId.toString() === value
      });
      if (this.categoryArray[index].subcategory.length !==0) {
        this.productForm.get('subcategory').setValidators([Validators.required])
      }
      else {
        this.productForm.get('subcategory').setValidators(null);
      }
      this.productForm.get('subcategory').updateValueAndValidity();
    });
  }
  onSubmitProduct(): void {
    this.submittedProduct = true;
    if (this.productForm.invalid) {
        return;
    }
    console.log(this.productForm.value)
  }
  onCategoryChnage(e){
    console.log(e.target.value);
    let index = this.categoryArray.findIndex((res)=> {
      return res.categoryId.toString() === e.target.value
    });
    // if(this.categoryArray[index].subcategory.length !==0){
    //   this.productForm.get('subcategory').setValidators([Validators.required]);
    // } else
    // this.productForm.get('subcategory').clearValidators();
  }
  getCategory(){
    this.productService.getCategory().subscribe((data)=>{
      this.categoryArray = data;
      console.log(data);
    })
  }
  onChange(e){
    // console.log(e,'blur')
  }
  openFileDialog(file: any) {
    file.value = '';
    file.click();
  }
  loadImage(e){
    console.log(e)
  }
  get f() { return this.productForm.controls; }
}
