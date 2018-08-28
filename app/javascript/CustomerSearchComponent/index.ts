import {Component, Injectable, OnInit} from '@angular/core';
import template from './template.html';
import {HttpClient} from "@angular/common/http";
import { Router} from "@angular/router";

@Injectable()
@Component({
    selector: 'shine-customer-search',
    template: template
})
export class CustomerSearchComponent {
    keywords: string;
    customers: Array<any>;
    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.keywords = '';
        this.customers = null;
    }

    onKey(value: string) {
        this.keywords = value;
        if (this.keywords.length < 3) {
            return;
        }
        this.onSearch();
    }

    onSearch = () => {
        this.http.get(`/customers.json?keywords=${this.keywords}`)
            .subscribe(this.onSuccess.bind(this), this.onError.bind(this))
    };

    viewDetails(customer) {
        this.router.navigate(['/', customer.id])
    }


    private onSuccess = (response) => {
        this.customers = response.customers;
    };

    private onError = (response) => {
        window.alert(response);
    };

}
