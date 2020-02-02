import { shallowMount } from '@vue/test-utils';
import ListComponent from '../../src/components/ListComponent';

describe('ListComponent.vue', () => {
    const counter = 6;
    let wrapper;

    beforeAll(() => {
        const crypto = require('crypto');

        Object.defineProperty(global.self, 'crypto', {
            value: {
                getRandomValues: arr => crypto.randomBytes(arr.length),
            },
        });

    });

    beforeEach(() => {
        wrapper = shallowMount(ListComponent, {
            propsData: {
                counter
            },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('renders ListComponent when passed', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
        expect(wrapper.element).toBeDefined();
        expect(wrapper.element).toMatchSnapshot();
    });

    it('props should be defined', () => {
        expect(wrapper.props().counter).toBe(counter);
    });

    /**
     * Expected length + 1 because of the table header
     */
    it('orders should defined and have same counter length + 1', () => {
        expect(wrapper.vm.orders).toHaveLength(counter + 1);
    });
});
