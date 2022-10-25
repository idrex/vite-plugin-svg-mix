// import { Word } from '@unmian/universal-utils-node';
import { parse } from 'svg-parser';

export interface Attrs {
  [key: string]: string | object;
  style: { [key: string]: any } | string;
}

// 图标元素
export interface IconElement {
  tag: string;
  attrs: Attrs;
  children?: IconElement[];
}

export interface SvgToElementOptions {
  replaceColor?: boolean; // 是否替换颜色
}

/**
 * @description: 序列化样式
 * @param {string|object} style 样式信息
 * @return {Object}
 */
// const normalizeStyle = (style: string | object): { [key: string]: any } => {
//   if (typeof style === 'string') {
//     const styles: { [key: string]: any } = {};
//     style.split(';').forEach((chunk) => {
//       const [key, value] = chunk.split(':');
//       // 连字符转驼峰命名
//       if (key.indexOf('-') !== -1) {
//         styles[Word.toCamelCase(key)] = value;
//       } else {
//         styles[key] = value;
//       }
//     });
//     return styles;
//   }

//   return style;
// };

/**
 * @description: 序列化属性
 * @param {Object} properties 属性
 * @return {Attrs}
 */
const normalizeAttrs = (properties: Record<string, string | number> = {}, options: SvgToElementOptions): Attrs => {
  const attrs = { ...properties };

  if (undefined !== attrs) {
    // 序列化类名
    if (undefined !== attrs.class) {
      attrs.className = attrs.class;
      delete attrs.class;
    }
    // 序列化长宽
    if (undefined !== attrs.viewBox) {
      attrs.width = '1em';
      attrs.height = '1em';
    }
    // 序列化颜色
    if (options.replaceColor) {
      if (undefined !== attrs.fill && attrs.fill !== 'none') {
        attrs.fill = undefined;
      }
      if (undefined !== attrs.stroke && attrs.stroke !== 'none') {
        attrs.stroke = undefined;
      }
    }
  }

  return {
    style: properties && {},
    ...attrs,
  };
};

/**
 * @description: 将 svg ast 转换为元素
 * @param {Node[]} nodes 节点数组
 * @return {IconElement[]}
 */
const astToElement = (nodes: any[], options: SvgToElementOptions): IconElement[] => {
  const elementNodes = nodes.filter((node) => node.type === 'element');
  return elementNodes.map((node) => {
    const temp: IconElement = {
      tag: node.tagName || '',
      attrs: normalizeAttrs(node.properties, options),
    };
    let children: any[] = [];
    if (Array.isArray(node.children)) {
      children = node.children.filter((child: any) => typeof child !== 'string');
    }
    if (children.length > 0) {
      temp.children = astToElement(children, options);
    }
    return temp;
  });
};

/**
 * @description: 将 svg 转化为元素
 * @param {string} raw 原始字符串
 * @param {SvgToElementOptions} options 配置项
 * @return {internal.Transform}
 */
export const svgToElement = (raw: string, options: SvgToElementOptions = { replaceColor: false }) => {
  const ast = parse(raw);
  const svgElements = astToElement(ast.children, options);
  if (svgElements.length < 1) {
    throw new Error('parse svg ast failed');
  }
  return svgElements[0];
};

/**
 * @description: 渲染节点
 * @param {IconElement} node
 * @return {string}
 */
export const renderNode = (node: IconElement): string => {
  const { attrs } = node;

  let attrString = '';
  if (attrs) {
    if (attrs.className) {
      attrs.class = attrs.className;
      delete attrs.className;
    }

    // 处理 style 的值
    // const styleObj = attrs.style as { [key: string]: any } | undefined;
    // if (styleObj) {
    //   const styleStr = Object.keys(styleObj).reduce((styles, styleKey) => {
    //     let destStyle = styles;
    //     destStyle += `${Word.toSeparatorCase(styleKey, { separator: '-' })}: ${styleObj[styleKey]};`;
    //     return destStyle;
    //   }, '');

    //   attrs.style = styleStr.trim();
    // }

    // 将属性转换成字符串
    const attrArray = Object.keys(attrs).reduce((classes: string[], currentAttrKey) => {
      const val = attrs[currentAttrKey] as string;
      if (val?.length > 0) {
        classes.push(`${currentAttrKey}="${val}"`);
      }
      return classes;
    }, []);

    if (attrArray.length) {
      attrString = ` ${attrArray.join(' ')}`;
    }
  }

  const childrenString = node.children?.map((child) => renderNode(child)).join('') ?? '';

  return `<${node.tag}${attrString}>${childrenString}</${node.tag}>`;
};
