import type { Plugin } from 'svgo';
import { optimize } from 'svgo';

const pluginConfig: Plugin[] = [
  // 清除空行无用空格等
  { name: 'cleanupAttrs', active: true },
  // 合并 style 标签
  { name: 'mergeStyles', active: true },
  // 将样式转换为行内样式
  { name: 'inlineStyles', active: true },
  // 移除 doctype 声明
  { name: 'removeDoctype', active: true },
  // 移除 xml 处理指令
  { name: 'removeXMLProcInst', active: true },
  // 移除注释
  { name: 'removeComments', active: true },
  // 移除 metadata 标签
  { name: 'removeMetadata', active: true },
  // 移除 title 标签
  { name: 'removeTitle', active: true },
  // 移除 desc 标签
  { name: 'removeDesc', active: true },
  // 移除没有 id 的 defs
  { name: 'removeUselessDefs', active: true },
  // 移除 xmlns 属性
  { name: 'removeXMLNS', active: true },
  // 移除编辑器命名空间、元素和属性
  { name: 'removeEditorsNSData', active: true },
  // 移除空的属性
  { name: 'removeEmptyAttrs', active: true },
  // 移除隐藏元素
  { name: 'removeHiddenElems', active: true },
  // 移除空的文本元素
  { name: 'removeEmptyText', active: true },
  // 移除空的容器元素
  { name: 'removeEmptyContainers', active: true },
  // 移除 viewBox 属性
  { name: 'removeViewBox', active: false },
  // 清理 enable-background 属性
  { name: 'cleanupEnableBackground', active: true },
  // 精简 style 标签内容
  { name: 'minifyStyles', active: true },
  // 将样式转换为 style 属性
  { name: 'convertStyleToAttrs', active: true },
  // 颜色转换
  { name: 'convertColors', active: true },
  // 转换路径数据
  { name: 'convertPathData', active: true },
  // 将多个转换合并为一个
  { name: 'convertTransform', active: true },
  // 移除一些未知的或者默认的内容
  { name: 'removeUnknownsAndDefaults', active: true },
  // 移除不可继承组的 presentation 属性
  { name: 'removeNonInheritableGroupAttrs', active: true },
  // 移除无用的 stroke 和 fill 属性
  { name: 'removeUselessStrokeAndFill', active: false },
  // 移除未使用命名空间定义
  { name: 'removeUnusedNS', active: true },
  // 将 id 或者 class 以文件名作为前缀
  { name: 'prefixIds', active: false },
  // 清理未使用的 id
  { name: 'cleanupIDs', active: true },
  // 清理默认的 px 单位
  { name: 'cleanupNumericValues', active: true },
  // 清理属性中的数字列表
  { name: 'cleanupListOfValues', active: false },
  // 将属性移动到组上
  { name: 'moveElemsAttrsToGroup', active: true },
  // 将群组上的属性移动到元素上
  { name: 'moveGroupAttrsToElems', active: true },
  // 折叠无用的组
  { name: 'collapseGroups', active: true },
  // 删除光栅图片
  { name: 'removeRasterImages', active: false },
  // 合并路径
  { name: 'mergePaths', active: true },
  // 将形状转换为路径
  { name: 'convertShapeToPath', active: true },
  // 将非偏心的 ellipse 转换为 circle
  { name: 'convertEllipseToCircle', active: true },
  // 将属性进行排序
  { name: 'sortAttrs', active: true },
  // 将 defs 的子元素进行排序
  { name: 'sortDefsChildren', active: true },
  // 移除 width/height，并添加 viewBox
  { name: 'removeDimensions', active: true },
  // 移除指定的属性
  { name: 'removeAttrs', active: true, params: { attrs: ['class', 'fill', 'clip-path'] } },
  // 通过 CSS 选择器移除属性
  { name: 'removeAttributesBySelector', active: false },
  // 通过 id 或者 class 移除元素
  { name: 'removeElementsByAttr', active: false },
  // 给 svg 元素添加 class
  { name: 'addClassesToSVGElement', active: false },
  // 给 svg 元素添加属性
  { name: 'addAttributesToSVGElement', active: false },
  // 移除超出画布的元素内容
  { name: 'removeOffCanvasPaths', active: false },
  // 移除 style 元素
  { name: 'removeStyleElement', active: false },
  // 移除 script 元素
  { name: 'removeScriptElement', active: false },
  // 使用 link 复用重复的路径
  { name: 'reusePaths', active: false },
];

export const transformSvg = (svgString: string) => {
  const resultSvg = optimize(svgString, {
    // optional but recommended field
    floatPrecision: 2,
    // all config fields are also available here
    // multipass: true,
    plugins: pluginConfig,
  });
  return resultSvg;
};
