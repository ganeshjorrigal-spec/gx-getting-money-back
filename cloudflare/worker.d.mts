declare const worker: { fetch(request: Request, env: { ASSETS: { fetch(request: Request): Response | Promise<Response> } }): Promise<Response> };
export default worker;
