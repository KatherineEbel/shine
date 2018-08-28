import './SpecHelper';
import { CustomerSearchComponent } from "CustomerSearchComponent";
import td from 'testdouble/dist/testdouble';

let component = null;

describe('CustomerSearchComponent', function () {
    beforeEach(function () {
        component = new CustomerSearchComponent();
    });

    describe('initial state', function () {
        it('should set customers to null', function () {
            expect(component.customers).toBe(null);
        });
        it('sets keywords to the empty string', function () {
            expect(component.keywords).toBe('');
        });
    });

    describe('search', function () {
        let mockHttp = null;
        beforeEach(() => {
            mockHttp = td.object(['get']);
            component = new CustomerSearchComponent(mockHttp);
        });

        describe("A search for 'pa', less than three characters", () => {
           it("sets the keywords to be 'pa'", () => {
               component.onKey('pa');
               expect(component.keywords).toBe('pa');
           });
           it('does not make an HTTP call', () => {
               component.onKey('pa');
               td.verify(mockHttp.get(), { times: 0 });
           });
        });

        describe("A search for 'pat', three or more characters", function () {
            let mockHttp = null;
            const customers = [
                {
                    id: 1,
                    created_at: (new Date()).toString(),
                    first_name: 'Pat',
                    last_name: 'Jones',
                    username: 'pj',
                    email: 'pjones@somewhere.net'
                },
                {
                    id: 2,
                    created_at: (new Date()).toString(),
                    first_name: 'Pat',
                    last_name: 'Jones',
                    username: 'pj',
                    email: 'pjones@somewhere.net'
                },
            ];

            beforeEach(function () {
                const response = td.object(['json']);
                td.when(response.json()).thenReturn({ customers });
                const observable = td.object(['subscribe']);
                td.when(observable.subscribe(
                    td.callback(response),
                    td.matchers.isA(Function))).thenReturn();
                mockHttp = td.object(['get']);
                td.when(mockHttp
                    .get('/customers.json?keywords=pat', td.matchers.isA(Object)))
                    .thenReturn(observable);
                component = new CustomerSearchComponent(mockHttp);

            });
            describe('A successful search', function () {
                it("sets the keywords to be 'pat'", function () {
                    component.onKey('pat');
                    expect(component.keywords).toBe('pat');
                });
                it('sets the customers to the results of the HTTP call', function() {
                   component.onKey('pat');
                   expect(component.customers).toBe(customers);
                });
            });
            describe('A search that fails on the back-end', () => {
                beforeEach(() => {
                    const response = 'There was an error!';
                    const observable = td.object(['subscribe']);

                    td.when(observable.subscribe(
                        td.matchers.isA(Function),
                        td.callback(response))).thenReturn();

                    mockHttp = td.object(['get']);
                    td.when(mockHttp
                        .get(
                            '/customers.json?keywords=pat',
                            td.matchers.isA(Object)
                        ))
                        .thenReturn(observable);
                    component = new CustomerSearchComponent(mockHttp);
                });
                it('sets the keywords to be "pat"', () => {
                    component.onKey('pat');
                    expect(component.keywords).toBe('pat');
                });

                it('leaves customers as null', () => {
                   component.onKey('pat');
                   expect(component.customers).toBe(null);
                });

                it('alerts the user with the response message', () => {
                    // TODO: replace alert messages with an Angular component.
                    td.replace(window, 'alert');
                    component.onKey('pat');
                    td.verify(window.alert('There was an error!'));
                });
            });
        });
    });
});