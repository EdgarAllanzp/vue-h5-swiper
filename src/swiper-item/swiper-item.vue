<template>
  <transition
    :name="pageTransition"
  >
    <div 
      v-show="active"
      class="swiper-item"
      :class="{ active }"
    >
      <div class="swiper-item-content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>

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
      status: STATUS.NORMAL
    };
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

  methods: {
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
