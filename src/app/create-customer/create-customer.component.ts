import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Customer } from './../customer';
import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customers: Customer[];
  customer: Customer = new Customer();
  submitted = false

  constructor(private httpService: HttpService, 
    private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.getCustomers();
    this.validElement();
  }

  getCustomers(): void {
    this.httpService.getCustomers()
    .subscribe(customers => this.customers = customers);
  }

  validElement(): void {
    let nameElement = document.getElementById("customerName");
    nameElement.addEventListener("keypress", function() {
      nameElement.className = 'form-control';
    })
    let mailElement = document.getElementById("customerMail");
    mailElement.addEventListener("keypress", function() {
      mailElement.className = 'form-control';
    })
    let phoneNumberElement = document.getElementById("customerPhoneNumber");
    phoneNumberElement.addEventListener("keypress", function() {
      phoneNumberElement.className = 'form-control';
    })
  }

  createCustomer(customerName: string, customerMail: string, customerPhoneNumber: string): void {
    let nameElement = document.getElementById("customerName");
    let mailElement = document.getElementById("customerMail");
    let phoneNumberElement = document.getElementById("customerPhoneNumber");
    if(customerPhoneNumber.valueOf() && customerMail.trim() && customerName.trim()){
      this.httpService.createCustomer({customerName, customerMail, customerPhoneNumber} as Customer)
      .subscribe(customer => {
        this.customers.push(customer);
      });
      this.location.back();
    } else {
      if (!customerName) {
        nameElement.className = 'form-control is=invalid';
      }
      if (!customerMail) {
        mailElement.className = 'form-control is=invalid';
      }
      if (!customerPhoneNumber) {
        phoneNumberElement.className = 'form-control is=invalid';
      }
    }
  }

  onSubmit() {
    this.submitted = true;
  }

  gotoList() {
    this.router.navigate(['/customers']);
  }

  returnPage() {
    window.location.reload();
  }
}
