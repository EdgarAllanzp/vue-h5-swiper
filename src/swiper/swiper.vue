<template>
  <div class="swiper">
    <slot />
    <slot 
      v-if="showIndicator"
      name="indicator">
      <ul class="swipe-progress">
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
    </slot>
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
          'push',
          'three'
        ].indexOf(value) !== -1;
      }
    },

    loop: {
      type: Boolean,
      default: false
    },

    interval: {
      type: Number,
      default: 3000
    },

    autoplay: {
      type: Boolean,
      default: false
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
      swipeDirection: '',
      pageAnimating: false,
      timer: null
    };
  },

  mounted() {
    this.initItems();
    this.$on('swipe', this.handleSwipe);
    this.$on('pageAnimationEnd', this.handlePageAnimationEnd);
    this.setActiveItem(0);
  },

  methods: {
    startTimer() {
      if (this.interval <= 0 || !this.autoplay) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },

    pauseTimer() {
      clearInterval(this.timer);
    },

    playSlides() {
      this.next();
    },

    getNextIndex(isNext = true) {
      const length = this.items.length;
      let index = this.activeIndex;

      if (this.loop) {
        index = (isNext ? (++index) : (--index + length)) % length;
        if (index === this.activeIndex) return -1;         
      } else {
        isNext ? index++ : index--;
        if (index >= length || index < 0) return -1;
      }

      if (
        index === this.activeIndex ||
        index >= length || 
        index < 0
      ) {
        return -1;
      }

      return index;
    },

    handleSwipe(direction) {
      if (direction === 'Up') {
        this.next();
      } else if (direction === 'Down') {
        this.prev();
      }
    },

    handlePageAnimationEnd() {
      this.pageAnimating = false;
      this.$emit('afterChange', this.activeIndex, this.oldIndex);
      this.startTimer();
    },

    prev() {
      let prevIndex = this.getNextIndex(false);
      if (prevIndex === -1) {
        return;
      }
      this.swipeDirection = 'Down';
      this.setActiveItem(prevIndex);
    },

    next() {
      let nextIndex = this.getNextIndex();
      if (nextIndex === -1) {
        return;
      }
      this.swipeDirection = 'Up';
      this.setActiveItem(nextIndex);
    },

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
        this.pauseTimer();
        this.pageAnimating = true;
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
  position: absolute;
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
      width: .25rem;
      height: .25rem;
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
