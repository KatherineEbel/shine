import 'hello_angular/polyfills';
import {Component, Injectable} from '@angular/core';
import template from './shine-customer-search.component.html';
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler/src/util";


let RESULTS = [
    {
        first_name: "Pat",
        last_name: "Smith",
        username: "psmith",
        email: "pat.smith@somewhere.net",
        created_at: "2016-02-05"
    },
    {
        first_name: "Patrick",
        last_name: "Jones",
        username: "pjpj",
        email: "jones.p@business.net",
        created_at: "2014-03-05"
    },
    {
        first_name: "Patricia",
        last_name: "Benjamin",
        username: "pattyb",
        email: "benjie@aol.info",
        created_at: "2016-01-02"
    },
    {
        first_name: "Patty",
        last_name: "Patrickson",
        username: "ppat",
        email: "pppp.@freemail.computer",
        created_at: "2016-02-05"
    },
    {
        first_name: "Jane",
        last_name: "Patrick",
        username: "janesays",
        email: "janep.@company.net",
        created_at: "2013-01-05"
    },
];

@Injectable()
@Component({
    selector: 'shine-customer-search',
    template: template
})
export class CustomerSearchComponent {
    keywords: string;
    customers: Array<any>;
    constructor(private http: HttpClient) {
        this.keywords = null;
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
            `/customers.json?keywords=${this.keywords}`
        ).subscribe(this.onSuccess.bind(this), this.onError.bind(this))
    };

    private onSuccess = (response) => {
        this.customers = response.customers;
    };

    private onError = (response) => {
        window.alert(response);
    };
}


