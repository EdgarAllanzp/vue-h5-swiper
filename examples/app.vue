<template>
  <div class="app">
    <device>
      <swiper
        :page-transition="pageTransition"
        :loop="loop"
        :autoplay="autoplay"
        :interval="interval"
        :show-indicator="false"
        @beforeChange="beforeChange"
        @afterChange="afterChange"
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
    </device>
    <el-card class="operation">
      <el-form label-position="top">
        <el-form-item label="Page Transition">
          <el-select v-model="pageTransition" size="mini">
            <el-option
              v-for="(item, index) in pageTransitions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Autoplay">
          <el-switch v-model="autoplay" />
        </el-form-item>
        <el-form-item label="Interval">
          <el-input-number :disabled="!autoplay" controls-position="right" v-model="interval" :min="100" :max="10000" :step="100" size="mini" />
        </el-form-item>
        <el-form-item label="Loop">
          <el-switch v-model="loop" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from '../';
import Page from './page';
import Device from './device';

const PAGE_TRANSITIONS = [
  'move',
  'fade',
  'cover',
  'carousel',
  'scale',
  'glue',
  'cube',
  'push',
  'three'
];

export default {
  components: {
    Device,
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
      ],
      loop: true,
      autoplay: true,
      interval: 1000,
      pageTransition: PAGE_TRANSITIONS[0],
      pageTransitions: PAGE_TRANSITIONS,
    };
  },

  methods: {
    beforeChange(activeIndex, oldIndex) {
      console.log(`before-change: ${activeIndex}, ${oldIndex}`);
    },

    afterChange(activeIndex, oldIndex) {
      console.log(`after-change: ${activeIndex}, ${oldIndex}`);
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}

.app {
  position: relative;

  .operation {
    position: absolute;
    top: 16px;
    left: 400px;
  }
}
</style>
