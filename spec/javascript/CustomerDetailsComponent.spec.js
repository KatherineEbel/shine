import './SpecHelper';
import { CustomerDetailsComponent } from "CustomerDetailsComponent";
import td from 'testdouble/dist/testdouble';

let component = null;

describe('CustomerDetailsComponent', () => {
    describe('initial state', () => {
        beforeEach(() => {
            component = new CustomerDetailsComponent();
        });
        it('sets customer to null', () => {
            expect(component.customer).toBe(null);
        });
    });

    describe('ngOnInit', () => {
        const customer = {
            id: 1,
            created_at: (new Date()).toString(),
            first_name: 'Pat',
            last_name: 'Jones',
            username: 'pj',
            email: 'pjjones@somewhere.net'
        };

        // additional setup
        const createMockHttp = customer => {
            const response = { customer };
            const observable = td.object(['subscribe']);
            td.when(observable.subscribe(
                td.callback(response),
                td.matchers.isA(Function)
            )).thenReturn();
            const mockHttp = td.object(['get']);
            td.when(
                mockHttp.get(`/customers/${customer.id}.json`)
            ).thenReturn(observable);
            return mockHttp;
        };

        const createMockRoute = id => {
            const observable = td.object(['subscribe']);
            const routeParams = { id };
            const mockActivatedRoute = { 'params': observable };

            td.when(observable.subscribe(
                td.callback(routeParams),
                td.matchers.isA(Function)
            )).thenReturn();
            return mockActivatedRoute
        };

        beforeEach(() => {
            const route = createMockRoute(customer.id);
            const http = createMockHttp(customer);
            component = new CustomerDetailsComponent(route, http);
        });

        it('fetches the customer from the back-end', () => {
           component.ngOnInit();
           expect(component.customer).toBe(customer);
        });
    });
});