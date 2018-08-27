import 'polyfills'
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import { CustomerSearchComponent } from "../CustomerSearchComponent";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    declarations: [
        CustomerSearchComponent
    ],
    bootstrap: [
        CustomerSearchComponent
    ]
})
export class CustomerAppModule {}

platformBrowserDynamic().bootstrapModule(CustomerAppModule);
