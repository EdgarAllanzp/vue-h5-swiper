<template>
  <div class="swiper">
    <slot />
    <ul
      v-if="showIndicator"
      class="swipe-progress"
    >
      <li 
        v-for="(item, index) in items"
        :key="index"
        class="swipe-progress-dot"
        :class="{
          active: index === activeIndex
        }"
        @click="moveTo(index)"
      />
    </ul>
  </div>
</template>

<script>
const DIRECTIONS = {
  UP: 'Up',
  DOWN: 'Down'
};

export default {
  name: 'Swiper',

  props: {
    showIndicator: {
      type: Boolean,
      default: true
    },

    pageTransition: {
      type: String,
      default: 'move',
      validator(value) {
        return [
          'move',
          'fade',
          'cover',
          'carousel',
          'scale',
          'glue',
          'cube',
          'cube',
          'push',
          'three'
        ].indexOf(value) !== -1;
      }
    }
  },

  provide() {
    return {
      swiper: this
    };
  },

  data() {
    return {
      items: [],
      activeIndex: -1,
      oldIndex: -1,
      swipeDirection: ''
    };
  },

  mounted() {
    this.initItems();
    this.setActiveItem(0);
  },

  methods: {
    moveTo(index) {
      if (index === this.activeIndex) {
        return;
      }
      this.swipeDirection = 
        index < this.activeIndex ?
        DIRECTIONS.DOWN :
        DIRECTIONS.UP;

      this.setActiveItem(index);
    },

    setActiveItem(index) {
      index = Number(index);
      const oldIndex = this.activeIndex;
      this.activeIndex = index
      if (oldIndex !== this.activeIndex) {
        this.oldIndex = oldIndex;
        this.$emit('beforeChange', this.activeIndex, this.oldIndex);
        this.items.forEach((item, index) => {
          item.setActive(index, this.activeIndex, oldIndex);
        });
      }
    },

    initItems() {
      this.items = this.$children.filter(child => child.$options.name === 'SwiperItem');
    }
  }
};
</script>

<style lang="scss">
.swiper {
  position: fixed;
  width: 100%;
  height: 100%;
  perspective: 1200;

  .swipe-progress {
    position: absolute;
    top: 50%;
    right: .3rem;
    transform: translateY(-50%);
    z-index: 102;

    &-dot {
      // width: .25rem;
      // height: .25rem;
      width: 20px;
      height: 20px;
      margin-bottom: .2rem;
      list-style: none;
      border-radius: 50%;
      opacity: .3;
      background-color: #f9f9f9;
    }

    &-dot.active {
      opacity: .7;;
      border: 1px solid #fff;
      background-color: transparent;
    }
  }
}
</style>
