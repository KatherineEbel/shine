import {Component, OnInit} from "@angular/core";
import template from './template.html';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
}
@Component({
    selector: 'shine-customer-details',
    template: template
})
export class CustomerDetailsComponent implements OnInit {
    id: number;
    customer: Customer;
    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) {
        this.id = null;
        this.customer = null;
    }
    ngOnInit(): void {
        const onFailed = response => {
            alert(response)
        };
        const onSuccess = response => {
            this.customer = response.customer;
        };

        const routeSuccess = params => {
            this.http.get(
                `/customers/${params['id']}.json`
            ).subscribe(onSuccess, onFailed)
        };
        this.activatedRoute.params.subscribe(routeSuccess, onFailed);
    }
}