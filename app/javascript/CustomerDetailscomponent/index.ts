import {Component, OnInit} from "@angular/core";
import template from './template.html';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'shine-customer-details',
    template: template
})
export class CustomerDetailsComponent implements OnInit {
    id: number;
    constructor(private activatedRoute: ActivatedRoute) {
        this.id = null;
    }
    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.id = +params['id'];
        })
    }
}