<template>
  <transition
    :name="pageTransition"
    @enter="enter"
    @after-enter="afterEnter"
  >
    <div 
      v-show="active"
      class="swiper-item"
      :class="{ active }"
    >
      <div 
        class="swiper-item-content"
        ref="swiper-content"
        @mousedown="swipeStart"
        @mouseup="swipeMove"
        @touchstart="swipeStart"
        @touchmove="swipeMove"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll';

const STATUS = {
  ENTER: 'enter',
  LEAVE: 'leave',
  NORMAL: ''
};

export default {
  name: 'SwiperItem',

  inject: ['swiper'],

  data() {
    return {
      active: false,
      status: STATUS.NORMAL,
      x1: null,
      y1: null,
      x2: null,
      y2: null,
      swipeDirection: '',
      scroll: null
    };
  },

  watch: {
    swipeDirection (direction) {
      direction && this.swiper.$emit('swipe', direction);
    }
  },

  computed: {
    pageTransition() {
      let transitionName = '';
      const { pageTransition, swipeDirection } = this.swiper;
      if (pageTransition && swipeDirection) {
        if (STATUS.ENTER === this.status) {
          const enterDirections = {
            Up: 'Down',
            Down: 'Up'
          };
          transitionName = `page-${pageTransition}${enterDirections[swipeDirection]}`;
        }
        if (STATUS.LEAVE === this.status) {
          transitionName = `page-${pageTransition}${swipeDirection}`;
        }
      }
      return transitionName;
    }
  },

  mounted() {
    this.scroll = new BScroll(this.$refs['swiper-content'], {
      mouseWheel: true,
      bounce: {
        top: false,
        bottom: false
      },
      click: true,
      scrollbar: {
        fade: true,
        interactive: false
      },
      preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|IMG)$/
      }
    });
  },

  methods: {
    enter() {
      this.scroll.refresh();
      this.scroll.scrollTo(0, 0);
    },

    afterEnter() {
      this.swiper.$emit('pageAnimationEnd');
    },

    swipeStart(evt) {
      if (this.swiper.pageAnimating) {
        return;
      }
      this.x1 = evt.clientX || evt.touches[0].clientX;
      this.y1 = evt.clientY || evt.touches[0].clientY;
      this.swipeDirection = '';
    },

    swipeMove(evt) {
      if (this.swiper.pageAnimating) {
        return;
      }
      const triggerDistance = 50;
      this.x2 = evt.clientX || evt.touches[0].clientX;
      this.y2 = evt.clientY || evt.touches[0].clientY;
      if ((this.x2 && Math.abs(this.x1 - this.x2) > triggerDistance) ||
          (this.y2 && Math.abs(this.y1 - this.y2) > triggerDistance)) {
        const direction = this.getDirection(this.x1, this.x2, this.y1, this.y2);
        if (this.reachBoundary(direction)) {
          this.swipeDirection = direction;
        }
      }
    },

    getDirection(x1, x2, y1, y2) {
      if (Math.abs(x1 - x2) >= Math.abs(y1 - y2)) {
        return (x1 - x2 > 0 ? 'Left' : 'Right');
      }
      return (y1 - y2 > 0 ? 'Up' : 'Down');
    },

    reachBoundary(direction) {
      const { y, maxScrollY } = this.scroll;
      if (direction === 'Up') {
        return y === maxScrollY;
      }
      return y === 0;
    },

    setActive(index, activeIndex, oldIndex) {
      this.active = index === activeIndex;

      if (index === activeIndex) {
        this.status = STATUS.ENTER;
      } else if (index === oldIndex) {
        this.status = STATUS.LEAVE;
      } else {
        this.status = STATUS.NORMAL;
      }
    }
  }
}
</script>

<style lang="scss">
@import './animation';

.swiper-item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  &.active {
    z-index: 1;
  }

  &-content {
    position: relative;
    min-height: 100%;
  }
}
</style>
