import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CustomerSearchComponent} from "./customers.component";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {HttpModule} from "@angular/http";
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
