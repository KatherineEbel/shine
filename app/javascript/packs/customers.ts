import 'polyfills'
import {Component, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import { CustomerSearchComponent } from "../CustomerSearchComponent";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {HttpClientModule} from "@angular/common/http";
import {CustomerDetailsComponent} from "../CustomerDetailscomponent";
import { RouterModule} from "@angular/router";

const router = RouterModule.forRoot(
    [
        {
            path: '',
            component: CustomerSearchComponent
        },
        {
            path: ':id',
            component: CustomerDetailsComponent
        }
    ]
);

@Component({
    selector: 'shine-customers-app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        router
    ],
    declarations: [
        AppComponent,
        CustomerSearchComponent,
        CustomerDetailsComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class CustomerAppModule {}


platformBrowserDynamic().bootstrapModule(CustomerAppModule);
