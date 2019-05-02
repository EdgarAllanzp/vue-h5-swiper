import { mount } from '@vue/test-utils';
import { Swiper, SwiperItem } from '../src';

describe('Swiper', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Swiper);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});