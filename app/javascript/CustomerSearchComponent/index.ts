import {Component, Injectable} from '@angular/core';
import template from './shine-customer-search.component.html';
import {HttpClient} from "@angular/common/http";

@Injectable()
@Component({
    selector: 'shine-customer-search',
    template: template
})
export class CustomerSearchComponent {
    keywords: string;
    customers: Array<any>;
    constructor(private http: HttpClient) {
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
        this.http.get(
            `/customers.json?keywords=${this.keywords}`, { observe: 'response'}
        ).subscribe(this.onSuccess.bind(this), this.onError.bind(this))
    };

    private onSuccess = (response) => {
        this.customers = response.json().customers;
    };

    private onError = (response) => {
        window.alert(response);
    };
}
