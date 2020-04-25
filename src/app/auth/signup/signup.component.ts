import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

const MINIMAL_ALLOWED_AGE = 18;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;

  constructor() { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - MINIMAL_ALLOWED_AGE);
  }

  onSubmit(f: NgForm) {
    console.log(f);
  }
}
