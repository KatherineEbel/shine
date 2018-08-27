import './SpecHelper';
import { CustomerSearchComponent } from "CustomerSearchComponent";

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
        describe("A search for 'pa', less than three characters", () => {
           it("sets the keywords to be 'pa'");
           it('does not make an HTTP call');
        });

        describe("A search for 'pat', three or more characters", () => {
            it("sets the keywords to be 'pat'");
            it('leaves customers as null');
            it('alerts the user with the response message');
        });
    });
});