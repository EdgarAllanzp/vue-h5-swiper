<template>
  <div class="app">
    <swiper
      page-transition="cube"
      loop
      autoplay
      :show-indicator="false"
    >
      <swiper-item
        v-for="(color, index) in colors"
        :key="index"
      >
        <page 
          :index="index + 1"
          :bg-color="color"
        />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from '../';
import Page from './page';

export default {
  components: {
    Page,
    Swiper,
    SwiperItem
  },

  data() {
    return {
      colors: [
        '#76D7C4',
        '#F1948A',
        '#BB8FCE',
        '#7FB3D5'
      ]
    };
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
