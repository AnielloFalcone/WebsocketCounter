import { shallowMount } from "@vue/test-utils";
import HomeComponent from "../../src/components/HomeComponent";

describe("HomeComponent.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HomeComponent);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders HomeComponent when passed", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.element).toBeDefined();
    expect(wrapper.element).toMatchSnapshot();
  });
});
