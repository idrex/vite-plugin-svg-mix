import { readFileSync } from 'fs';
import { resolve } from 'path';
import { expect, test } from 'vitest';

import { transformSvg } from '../src/svgo';

test('svgo transformSvg()', () => {
  const closeFile = resolve(process.cwd(), 'src/assets/close.svg');

  const svgString = readFileSync(closeFile).toString();

  console.log('file', transformSvg(svgString));

  // expect(transformSvg(svgString));
});
