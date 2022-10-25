# Vite-Plugin-Svg-Mix

Vite SVG Sprite 插件，不限制语言，React/Vue都可使用

通过 `svgo` 进行优化，`svg-parser`调整结构，`svg-sprite` 进行生成

# 使用方法

- 安装依赖

```bash
$ pnpm add vite-plugin-svg-mix -D
```

- `vite.config.ts` 中的配置插件

```js
import svgMix from 'vite-plugin-svg-mix'
import { resolve } from 'path'

export default () => {
  return {
    ...,
    plugins: [
      ...,
      svgMix({
        include: resolve(process.cwd(), 'src/assets/icons'),
        injectTo: 'body',
        prefix: 'icon',
      }),
    ],
  }
}
```

- 代码中引用

```html
<style>
  .icon {
    display: inline-block;
    width: 4em;
    height: 4em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }
</style>
<svg class="icon" viewBox="0 0 32 32">
  <use xlink:href="#icon-close"></use>
</svg>
```
