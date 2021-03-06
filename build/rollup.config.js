import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';
import autoprefixer from 'autoprefixer';
import resolve from 'rollup-plugin-node-resolve';

const argv = minimist(process.argv.slice(2));

const config = {
  input: 'src/index.js',
  output: {
    name: 'Swiper',
    exports: 'named'
  },
  plugins: [
    resolve(),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
      style: {
        postcssPlugins: [
          autoprefixer
        ]
      }
    }),
    babel(),
    // babel({
    //   runtimeHelper: true,
    //   exclude: 'node_modules/**'
    // })
  ]
};

if (argv.format === 'iife') {
  config.plugins.push(terser())
}

export default config;
