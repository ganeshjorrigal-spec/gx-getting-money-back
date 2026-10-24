import {beforeAll, describe, expect, it, vi} from 'vitest';

const {routes} = vi.hoisted(() => ({routes: [] as Array<{path?: string; pathPrefix?: string; handler: (ctx: unknown, request: Request) => Promise<Response>}>}));
vi.mock('convex/server', async importOriginal => ({...await importOriginal<typeof import('convex/server')>(), httpRouter: () => ({route: (route: typeof routes[number]) => routes.push(route)})}));
vi.mock('../convex/_generated/server', () => ({httpAction: (handler: unknown) => handler}));
vi.mock('@convex-dev/static-hosting', () => ({registerStaticRoutes: vi.fn()}));
beforeAll(async () => {await import('../convex/http');});

describe('Convex static page entry points', () => {
  it.each(['/cases', '/cases/'])('opens the exported cases screen for %s', async path => {
    const response = await routes.find(route => route.path === path)!.handler({}, new Request(`https://test.convex.site${path}`));
    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('https://test.convex.site/cases/index.html');
  });
  it.each(['RG-ABC123', 'TB-ABC123'])('opens the shared case screen for %s', async code => {
    const route = routes.find(route => route.pathPrefix === '/c/')!;
    const response = await route.handler({}, new Request(`https://test.convex.site/c/${code}?google=connected`));
    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe(`https://test.convex.site/c/index.html?google=connected&code=${code}`);
  });
  it('does not redirect an invalid case code', async () => {
    const route = routes.find(route => route.pathPrefix === '/c/')!;
    const response = await route.handler({runQuery: async () => null}, new Request('https://test.convex.site/c/RG-invalid/extra'));
    expect(response.status).toBe(404);
    expect(response.headers.get('Location')).toBeNull();
  });
  it('serves the real exported case HTML without falling back to the landing page', async () => {
    const route = routes.find(route => route.pathPrefix === '/c/')!;
    const runQuery = vi.fn(async (..._args: unknown[]) => ({appStorageId: 'synthetic', contentType: 'text/html'}));
    const response = await route.handler({runQuery, storage: {get: async () => new Blob(['<h1>Case screen</h1>'])}}, new Request('https://test.convex.site/c/index.html?code=RG-ABC123'));
    expect(await response.text()).toBe('<h1>Case screen</h1>');
    expect(runQuery.mock.calls[0]?.[1]).toEqual({path: '/c/index.html', spaFallback: false});
  });
});
