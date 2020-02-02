import { shallowMount } from "@vue/test-utils";
import CounterComponent from "../../src/components/CounterComponent";

describe("CounterComponent.vue", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(CounterComponent, {
            propsData: {
                counter: 6
            },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("renders CounterComponent when passed", () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
        expect(wrapper.element).toBeDefined();
        expect(wrapper.element).toMatchSnapshot();
    });

    it('props should be defined', () => {
        expect(wrapper.props().counter).toBe(6);
    });
});
