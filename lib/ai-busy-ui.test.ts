import {beforeAll, expect, it} from 'vitest';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFile} from 'node:fs/promises';
import {transform} from 'esbuild';
import {createRequire} from 'node:module';
import {aiBusyMessage} from './ai-busy';
let AiBusyNotice: React.ComponentType<{onRetry: () => Promise<unknown>}>;
beforeAll(async () => {
  const source = await readFile('app/c/ai-busy-notice.tsx', 'utf8');
  const compiled = await transform(source, {loader: 'tsx', jsx: 'automatic', format: 'cjs'});
  const module = {exports: {} as {AiBusyNotice: typeof AiBusyNotice}}, require = createRequire(import.meta.url);
  new Function('require', 'module', 'exports', compiled.code)((name: string) => name.includes('ai-busy') ? {aiBusyMessage} : require(name), module, module.exports);
  AiBusyNotice = module.exports.AiBusyNotice;
});
it('shows the exact busy message, saved-input reassurance and a manual retry', () => {
  const html = renderToStaticMarkup(React.createElement(AiBusyNotice, {onRetry: async () => null}));
  expect(html).toContain('Busy right now. Try again in a few minutes.');
  expect(html).toContain('Your message and screenshots are saved.');
  expect(html).toContain('role="alert"');
  expect(html).toContain('Try again</button>');
});
