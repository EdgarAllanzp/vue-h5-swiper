<h2 align="center">Vue H5 Swiper</h2>
<p align="center"><strong>Slight</strong> slider vue component for H5 applications.</p>

## Features

## Documentation

### Props

|Prop                 |Default        |Description          |
|---------------------|---------------|---------------------|
|`loop`               |`false`        |Enable loop mode.    |
|`show-indicator`     |`true`         |Display indicators.  |
|`page-transition`    |`'move'`       |Paging animation. Available animations: `['move', 'fade', 'cover', 'carousel', 'scale', 'glue', 'cube', 'push', 'three']`   |
|`autoplay`           |`false`        |Auto slide.          |
|`interval`           |`3000`         |Auto slide interval.          |

### Methods

|Method          |Description                 |
|----------------|----------------------------|
|`moveTo(index)` |Move to the specified page. |
|`next()`        |Move to next page.          |
|`prev()`        |Move to previous page.      |


## Installation

```sh
npm install vue-h5-swiper --save

# or use yarn
yarn add vue-h5-swiper
```

```vue
<template>
  <swiper>
    <swiper-item>
      ...
      Content Slot
      ...
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'vue-h5-swiper';

export default {
  components: {
    Swiper,
    SwiperItem
  }
};
</script>
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/EdgarAllanzp/vue-h5-swiper/issues/new).

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019, [Edgar Li](https://github.com/EdgarAllanzp)
