import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactFormInit();
  }

  
  contactFormInit(): void {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      name: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  get c() { return this.contactForm.controls; }

  onSubmit() : void {
    this.submitted = true;
    if (this.contactForm.invalid) {
        return;
    }
    console.log(this.contactForm)
  }
}
