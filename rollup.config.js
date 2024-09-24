import typescript from 'rollup-plugin-typescript2';
import image from '@rollup/plugin-image';
import svgr from '@svgr/rollup';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: ['src/index.ts'],
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'es',
      exports: 'named',
    },
  ],
  plugins: [typescript(), image(), svgr(), commonjs()],
  external: ['react'],
};
