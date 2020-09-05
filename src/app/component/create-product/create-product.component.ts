import {  Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ICategory, ISubCategory } from 'src/app/interface/category';
import * as _ from 'lodash';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ICountryData, IStateData, ICityData } from 'src/app/interface/user';
import { IProduct, IProductImage } from 'src/app/interface/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  @ViewChild('tagInput',{static:false}) tagInputRef: ElementRef;
  private userId: number;
  tags: string[] = [];
  TypeArray: string[] = ['Cash','Lease'];
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
  countryArray: Array<ICountryData> = [];
  stateArray: Array<IStateData> = [];
  cityArray: Array<ICityData> = [];
  uploadImageArray: Array<IProductImage> = [
    {image:'',isImageSaved:false, coverImage:true},
    {image:'',isImageSaved:false, coverImage:false},
    {image:'',isImageSaved:false,coverImage:false},
    {image:'',isImageSaved:false,coverImage:false},
    {image:'',isImageSaved:false,coverImage:false},
    {image:'',isImageSaved:false,coverImage:false},
  ]

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private commonService: CommonService
    ) { 
      this.userId = this.commonService.getUserId();
      console.log(this.userId);
    }

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
      stateId: [{value:null, disabled:true}, [Validators.required]],
      cityId: [{value:null, disabled:true}, [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      addressLine3: ['', [Validators.required]],
      tags: [[], [Validators.required]],
      type: [null, [Validators.required]],
      subCategoryId: [{value:null, disabled:true}],
      price: ['', [Validators.required, Validators.min(2)]]
      // imageurl: [[], [Validators.required]],
    });
    this.productForm.get('category').valueChanges.subscribe(value => {
      if(value !== null){
        let index = this.categoryArray.findIndex((res)=> {
          return res.categoryId.toString() === value
        });
        if (this.categoryArray[index].subcategory.length !==0) {
          this.subCategoryArray = this.categoryArray[index].subcategory;
          this.productForm.get('subCategoryId').setValue('');
          this.productForm.get('subCategoryId').enable();
          this.productForm.get('subCategoryId').setValidators([Validators.required])
        }
        else {
          this.productForm.get('subCategoryId').setValidators(null);
          this.productForm.get('subCategoryId').disable();
        }
        this.productForm.get('subCategoryId').updateValueAndValidity();
      } else {
        this.productForm.get('subCategoryId').setValue(null);
        this.productForm.get('subCategoryId').setValidators(null);
        this.productForm.get('subCategoryId').disable();
      }
    });
  }
  onSubmitProduct(): void {
    this.submittedProduct = true;
    if (this.productForm.invalid) {
        return;
    }
    let productPlayload :IProduct;
    productPlayload = this.productForm.value;
    productPlayload.userId = this.userId;
    productPlayload.tags = this.tags;
    productPlayload.cityId = Number(productPlayload.cityId);
    productPlayload.stateId = Number(productPlayload.stateId);
    productPlayload.countryId = Number(productPlayload.countryId);
    productPlayload.subCategoryId = Number(productPlayload.subCategoryId);
    productPlayload.pictures =  JSON.parse(JSON.stringify(this.uploadImageArray));
    productPlayload.pictures.map((pic)=>{
      delete pic.isImageSaved;
      pic.image = pic.image.split(',')[1];
    })
    console.log(this.productForm.value)
    console.log(this.uploadImageArray)
    console.log(productPlayload)
    this.isRequestProduct = true
    this.productService.createProduct(productPlayload).subscribe((res)=>{
      this.isRequestProduct = false;
      this.resetForm();
      this.commonService.success('Ad Posted Successfully');
      console.log(res);
    }, (error) => {
      this.isRequestProduct = false;
      // this.commonService.error(error);
      console.log(error);
    })
  }
 
  resetForm(): void{
     this.productForm.get('category').setValue(null);
     this.productForm.get('countryId').setValue(null);
     this.productForm.get('stateId').setValue(null);
     this.productForm.get('cityId').setValue(null);
     this.productForm.get('type').setValue(null);
     this.productForm.get('addressLine2').setValue('');
     this.productForm.get('addressLine1').setValue('');
     this.productForm.get('addressLine3').setValue('');
     this.productForm.get('tags').setValue([]);
     this.productForm.get('description').setValue('');
     this.productForm.get('title').setValue('');
     this.productForm.get('price').setValue('');
     this.tags = [];
     this.uploadImageArray.map((res)=>{
       res.image = '';
       res.isImageSaved = false;
     })
  }

  getCategory(){
    this.productService.getCategory().subscribe((data)=>{
      this.categoryArray = data;
    })
  }

  getCountry(){
    this.userService.getCountry().subscribe((data)=>{
      this.countryArray = data;
    });
    // this.onCountyChange();
  }

  onCountyChange($event){
    this.userService.getState(Number($event.target.value)).subscribe((res)=>{
      this.stateArray = res;
      this.productForm.get('stateId').enable();
    });
  }

  onStateChange($event){
    this.userService.getCity(Number($event.target.value)).subscribe((res)=>{
      console.log(res)
      this.cityArray = res;
      this.productForm.get('cityId').enable();
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
                    this.uploadImageArray[index].image = imgBase64Path;
                    this.uploadImageArray[index].isImageSaved = true;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage(index:number) {
  this.uploadImageArray[index].image = null;
  this.uploadImageArray[index].isImageSaved = false;
}

// Image Code end

// Tag Code start
focusTagInput(): void {
  this.tagInputRef.nativeElement.focus();
}

onKeyUp(event: KeyboardEvent) {
  const inputValue: string = this.productForm.controls.tags.value;
  if (event.code === 'Backspace' && !inputValue) {
    this.removeTag();
    return;
  } else {
    if(this.tags.length == 5 && event.code !== 'Backspace'){
      return false;
    }
    if (event.code === 'Space') {
      this.addTag(inputValue);
      this.productForm.controls.tags.setValue('');
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
