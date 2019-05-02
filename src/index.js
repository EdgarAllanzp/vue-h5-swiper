import Swiper from './swiper';
import SwiperItem from './swiper-item';

export function install(Vue) {
  if (install.installed) {
    return;
  }
  install.installed = true;
  Swiper.install(Vue);
  SwiperItem.install(Vue);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

export { Swiper, SwiperItem };
