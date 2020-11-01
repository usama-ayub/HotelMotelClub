import {  Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ICategory, ISubCategory } from 'src/app/interface/category';
import * as _ from 'lodash';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ICountryData, IStateData, ICityData } from 'src/app/interface/user';
import { IProduct, IProductImage, IProductData } from 'src/app/interface/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  @ViewChild('tagInput',{static:false}) tagInputRef: ElementRef;
  private userId: number;
  private userVerify: boolean = false;
  tags: string[] = [];
  TypeArray: string[] = ['Cash','Lease'];
  adsId:number = 0;
  adsDetail:IProductData;
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
        'justifyFull',
        'subscript',
        'superscript',
        'underline', 'strikeThrough',
        'undo',
        'redo',
        'indent',
        'fontName',
        'outdent',
      ],
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
    {image:'',isImageSaved:false,coverImage:false}
  ]
  pageTitle:string = 'Post An Ad';
  isSingleImageUpload:boolean = false;
  isSelectedCategoryJob:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private commonService: CommonService
    ) { 
      this.userId = this.commonService.getUserId();
      this.userVerify = this.commonService.getUserVerify();
      this.adsId = Number(this.route.snapshot.params.id);
      if(this.adsId){
        this.getAdsDetail();
        this.pageTitle = "Update Ads"
      }
    }

  ngOnInit(): void {
    this.productFormInit();
    this.getCategory();
    this.getCountry();
  }
  getAdsDetail(): void{
    this.productService.adsDetail({userId:this.userId,adId:this.adsId})
    .subscribe((res)=>{
      this.adsDetail = res;
      this.uploadImageArray.map((pic,index)=>{
        pic.image = res.images[index].picture;
        pic.isImageSaved = true;
        pic.coverImage = res.images[index].coverImage;
      })
      this.tags = res.tags;
      this.productForm.get('price').setValue(res.price);
      this.productForm.get('description').setValue(res.description);
      this.productForm.get('addressLine1').setValue(res.addressLine1);
      this.productForm.get('addressLine2').setValue(res.addressLine2);
      this.productForm.get('addressLine3').setValue(res.addressLine3);
      this.productForm.get('type').setValue(res.type);
    })
  }
  productFormInit(): void {
    this.productForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      title: ['', [Validators.required]],
      category: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      stateId: [{value:null, disabled:true}, [Validators.required]],
      cityId: [{value:null, disabled:true}, [Validators.required]],
      addressLine1: ['', [Validators.required, Validators.maxLength(50)]],
      addressLine2: ['', [Validators.required, Validators.maxLength(50)]],
      addressLine3: ['', [Validators.required, Validators.maxLength(50)]],
      tags: [''],
      type: [null, [Validators.required]],
      subCategoryId: [{value:null, disabled:true}],
      price: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(5)]]
      // imageurl: [[], [Validators.required]],
    });
    this.productForm.get('category').valueChanges.subscribe(value => {
      if(value !== null){
        let index = this.categoryArray.findIndex((res)=> {
          return res.categoryId.toString() === value.categoryId.toString();
        });
        if (this.categoryArray[index].subcategory.length !==0) {
          if(this.categoryArray[index].categoryName == 'Jobs'){
            this.productForm.get('price').setValidators(null);
            this.productForm.get('type').setValue(null);
            this.TypeArray = ['Permanent','Contractual'];
            this.isSelectedCategoryJob = true;
          } else {
            this.productForm.get('price').setValidators([Validators.required]);
            this.productForm.get('type').setValue(null);
            this.isSelectedCategoryJob = false;
          }
          this.subCategoryArray = this.categoryArray[index].subcategory;
          if(this.adsId){
             this.productForm.get('subCategoryId').setValue(this.adsDetail.subCategoryId);
          } else {
            this.productForm.get('subCategoryId').setValue('');
          }
          this.productForm.get('subCategoryId').enable();
          this.productForm.get('subCategoryId').setValidators([Validators.required])
        }
        else {
          this.productForm.get('subCategoryId').setValidators(null);
          this.productForm.get('subCategoryId').disable();
        }
        this.productForm.get('subCategoryId').updateValueAndValidity();
        this.productForm.get('price').updateValueAndValidity();
      } else {
        this.productForm.get('subCategoryId').setValue(null);
        this.productForm.get('subCategoryId').setValidators(null);
        this.productForm.get('subCategoryId').disable();
      }
    });
  }
  onSubmitProduct(): void {
    if(!this.userVerify){
      this.commonService.warning('Please Verify Your Account');
      return;
    }
    if(this.isRequestProduct){
      return;
    }
    this.submittedProduct = true;
    let isEmptyImg = this.uploadImageArray.some((pic)=>{
      return pic.image
    });
    this.isSingleImageUpload = isEmptyImg;
    if(!isEmptyImg){
      return;
    }
    if (this.productForm.invalid) {
        return;
    }
    if(this.tags.length == 0){
      return;
    }
   
    if(this.tags.length == 0){
      return;
    }
    let productPlayload :any;
    productPlayload = this.productForm.value;
    productPlayload.userId = this.userId;
    productPlayload.tags = this.tags;
    productPlayload.cityId = Number(productPlayload.cityId.cityId);
    productPlayload.price = productPlayload.price ? Number(productPlayload.price) : 0;
    productPlayload.stateId = Number(productPlayload.stateId.stateId);
    productPlayload.countryId = Number(productPlayload.countryId.countryId);
    productPlayload.subCategoryId = Number(productPlayload.subCategoryId.subCategoryId);
    productPlayload.pictures =  JSON.parse(JSON.stringify(this.uploadImageArray));
    let selectedImageArray:Array<IProductImage> = [];
    productPlayload.pictures.map((pic)=>{
      if(pic.image){
        selectedImageArray.push(pic);
        pic.image = pic.image.split(',')[1];
      }
    });
    let isCoverImage = selectedImageArray.some((isCoverImg)=>{ return isCoverImg.coverImage});
    if(!isCoverImage){
      selectedImageArray[0].coverImage = true;
    }
    productPlayload.pictures = selectedImageArray;
    this.isRequestProduct = true;
    this.disabledField();
    if(this.adsId){
      return;
    }
    this.productService.createProduct(productPlayload).subscribe((res)=>{
      this.isRequestProduct = false;
      this.submittedProduct = false;
      this.resetForm();
      this.disabledField();
      this.commonService.success('Ad Posted Successfully');
    }, (error) => {
      this.isRequestProduct = false;
      this.disabledField(true);
      this.commonService.error(error);
      console.log(error);
    })
  }
  disabledField(isParams:boolean = false){
    if(isParams){
      this.productForm.get('stateId').enable();
      this.productForm.get('cityId').enable();
    }
    if(this.isRequestProduct){
      this.productForm.get('category').disable();
      this.productForm.get('countryId').disable();
      this.productForm.get('stateId').disable();
      this.productForm.get('cityId').disable();
      this.productForm.get('subCategoryId').disable();
      this.productForm.get('type').disable();
      this.productForm.get('addressLine2').disable();
      this.productForm.get('addressLine1').disable();
      this.productForm.get('addressLine3').disable();
      this.productForm.get('description').disable();
      this.productForm.get('title').disable();
      this.productForm.get('price').disable();
      this.editorConfig.editable = false;
    } else {
      this.productForm.get('category').enable();
      this.productForm.get('countryId').enable();
      this.productForm.get('type').enable();
      this.productForm.get('addressLine2').enable();
      this.productForm.get('addressLine1').enable();
      this.productForm.get('addressLine3').enable();
      this.productForm.get('description').enable();
      this.productForm.get('title').enable();
      this.productForm.get('price').enable();
      this.editorConfig.editable = true;
    }
     
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
      if(this.adsId){
        this.productForm.get('category').setValue(this.adsDetail.categoryId);
      }
    })
  }

  getCountry(){
    this.userService.getCountry().subscribe((data)=>{
      this.countryArray = data;
      if(this.adsId){
        let id = this.countryArray.find((c)=>{
          return c.countryName = this.adsDetail.country;
        }).countryId;
        this.productForm.get('countryId').setValue(id);
        this.onCountyChange(id,'ts');
      }
    });
  }

  onCountyChange($event, type:string = 'html'){
    let countryId = 0;
    if(type == 'html'){
      countryId = Number($event.value.countryId)
    } else {
      countryId = $event;
    }
    this.userService.getState(countryId).subscribe((res)=>{
      this.stateArray = res;
      this.productForm.get('stateId').enable();
      // if(this.adsId){
      //   let id = this.stateArray.find((c)=>{
      //     return c.stateName = this.adsDetail.st;
      //   }).countryId;
      //   this.productForm.get('countryId').setValue(id);
      //   this.onCountyChange(id,'ts');
      // }
    });
  }

  onStateChange($event){
    this.userService.getCity(Number($event.value.stateId)).subscribe((res)=>{
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
  if(this.isRequestProduct){
    return;
  }
  if(this.uploadImageArray[index].coverImage){
    this.uploadImageArray[0].coverImage = true;
  }
  this.uploadImageArray[index].image = null;
  this.uploadImageArray[index].isImageSaved = false;
  if(index !== 0){
    this.uploadImageArray[index].coverImage = false;
  }
}

selectCoverImage(index:number){
  if(this.isRequestProduct) {
    return
  }
  this.uploadImageArray.map(res=>res.coverImage = false);
  this.uploadImageArray[index].coverImage = true;
}

// Image Code end

// Tag Code start
focusTagInput(): void {
  if(this.isRequestProduct){
    return;
  }
  this.tagInputRef.nativeElement.focus();
}

onKeyUp(event: KeyboardEvent) {
  if(this.isRequestProduct){
    return;
  }
  const inputValue: string = this.productForm.controls.tags.value;
  if (event.code === 'Backspace' && !inputValue) {
    this.removeTag();
    return;
  } else {
    if(this.tags.length == 5 && event.code !== 'Backspace'){
      return false;
    }
    if (event.code === 'Enter') {
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
  if(this.isRequestProduct){
    return;
  }
  if (!!tag) {
    _.pull(this.tags, tag);
  } else {
    this.tags.splice(-1);
  }
}

  get f() { return this.productForm.controls; }
}
