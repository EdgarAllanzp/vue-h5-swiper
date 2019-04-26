import SwiperItem from './swiper-item.vue';

SwiperItem.install = function(Vue) {
  Vue.component(SwiperItem.name, SwiperItem);
};

export default SwiperItem;
