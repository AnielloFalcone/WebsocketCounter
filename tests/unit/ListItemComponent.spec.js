import Vue from "vue";
import { shallowMount } from '@vue/test-utils';
import ListItemComponent from '../../src/components/ListItemComponent';

describe('ListItemComponent.vue', () => {
    let wrapper;
    const order = {
        id: '1673c3a3-8777-4064-bb96-43f02c514378',
        number: 12,
        amount: 123
    };

    beforeAll(() => {
        Vue.filter('currency', function (value) {
            return parseFloat(value).toFixed(2) + '€';
        });
    });

    beforeEach(() => {
        wrapper = shallowMount(ListItemComponent, {
            propsData: {
                order
            },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('renders ListItemComponent when passed', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
        expect(wrapper.element).toBeDefined();
        expect(wrapper.element).toMatchSnapshot();
    });

    it('order should be defined', () => {
        expect(wrapper.props().order).toBeDefined();
        expect(wrapper.props().order).toBeInstanceOf(Object);
    });

    it('should render table labels if order.number is undefined', () => {
        wrapper.props().order = {
            numberLabel: '',
            idLabel: 'Order id',
            amountLabel: 'Amount'
        };

        expect(wrapper.element).toThrowErrorMatchingSnapshot();
    });
});
