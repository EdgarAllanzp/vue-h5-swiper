import Swiper from './swiper.vue';

Swiper.install = function(Vue) {
  Vue.component(Swiper.name, Swiper);
};

export default Swiper;
