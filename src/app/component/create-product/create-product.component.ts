import {  Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ICategory, ISubCategory } from 'src/app/interface/category';
import * as _ from 'lodash';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { UserService } from 'src/app/shared/services/user/user.service';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  @ViewChild('tagInput',{static:false}) tagInputRef: ElementRef;
  tags: string[] = ['html', 'Angular'];

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
  categoryArray: Array<ICategory> = [];
  subCategoryArray: Array<ISubCategory> = [];

  uploadImageArray = [
    {imageUrl:'',isImageSaved:false},
    {imageUrl:'',isImageSaved:false},
    {imageUrl:'',isImageSaved:false},
    {imageUrl:'',isImageSaved:false},
    {imageUrl:'',isImageSaved:false},
    {imageUrl:'',isImageSaved:false},
  ]

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private commonService: CommonService
    ) { }

  ngOnInit(): void {
    this.productFormInit();
    this.getCategory();
    this.getCountry();
  }

  productFormInit(): void {
    this.productForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      title: ['', [Validators.required]],
      category: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      stateId: [{value:'', disabled:true}, [Validators.required]],
      cityId: [{value:'', disabled:true}, [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      addressLine3: ['', [Validators.required]],
      tag: [[], [Validators.required]],
      type: ['', [Validators.required]],
      subCategoryId: [{value:'', disabled:true}],
      price: ['', [Validators.required, Validators.min(2)]]
      // imageurl: [[], [Validators.required]],
    });
    this.productForm.get('category').valueChanges.subscribe(value => {
      let index = this.categoryArray.findIndex((res)=> {
        return res.categoryId.toString() === value
      });
      if (this.categoryArray[index].subcategory.length !==0) {
        this.subCategoryArray = this.categoryArray[index].subcategory;
        this.productForm.get('subcategory').setValue('');
        this.productForm.get('subcategory').enable();
        this.productForm.get('subcategory').setValidators([Validators.required])
      }
      else {
        this.productForm.get('subcategory').setValidators(null);
        this.productForm.get('subcategory').disable();
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
 
  getCategory(){
    this.productService.getCategory().subscribe((data)=>{
      this.categoryArray = data;
    })
  }

  getCountry(){
    this.userService.getCountry().subscribe((data)=>{
      console.log(data)
    });
    this.onCountyChange();
  }

  onCountyChange(){
    this.userService.getState(576).subscribe((res)=>{
      console.log(res)
    });
    this.onStateChange();
  }

  onStateChange(){
    this.userService.getCity(1).subscribe((res)=>{
      console.log(res)
    })
  }
  onChange(e){
    // console.log(e,'blur')
  }

  // Image Code start

  fileChangeEvent(fileInput: any, index:number) {
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        // if (fileInput.target.files[0].size > max_size) {
        //     this.imageError =
        //         'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        //     return false;
        // }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.commonService.error('Only Images are allowed ( JPG | PNG )');
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];
                console.log(img_height, img_width);
                if (img_height > max_height && img_width > max_width) {
                    this.commonService.error(`Maximum dimentions allowed ${max_height}*${max_width}px`);
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.uploadImageArray[index].imageUrl = imgBase64Path;
                    this.uploadImageArray[index].isImageSaved = true;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage(index:number) {
  this.uploadImageArray[index].imageUrl = null;
  this.uploadImageArray[index].isImageSaved = false;
}

// Image Code end

// Tag Code start
focusTagInput(): void {
  this.tagInputRef.nativeElement.focus();
}

onKeyUp(event: KeyboardEvent) {
  const inputValue: string = this.productForm.controls.tag.value;
  if (event.code === 'Backspace' && !inputValue) {
    this.removeTag();
    return;
  } else {
    if(this.tags.length == 5 && event.code !== 'Backspace'){
      return false;
    }
    if (event.code === 'Space') {
      this.addTag(inputValue);
      this.productForm.controls.tag.setValue('');
    }
  }
}

addTag(tag: string): void {
  if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
    tag = tag.slice(0, -1);
  }
  if (tag.length > 0 && !_.find(this.tags, tag)) {
    this.tags.push(tag);
  }
}

removeTag(tag?: string): void {
  if (!!tag) {
    _.pull(this.tags, tag);
  } else {
    this.tags.splice(-1);
  }
}

  get f() { return this.productForm.controls; }
}
