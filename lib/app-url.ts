type AppEnv = { [name: string]: string | undefined };

export function publicAppUrl(env: AppEnv): string {
  return (env.PUBLIC_APP_URL?.trim() || env.CONVEX_SITE_URL?.trim() || "").replace(/\/+$/, "");
}

export function privateCaseUrl(base: string, code: string, token: string): string {
  return `${base.replace(/\/+$/, "")}/c/index.html?code=${encodeURIComponent(code)}#k=${encodeURIComponent(token)}`;
}

export const savedCasesNotice = "Cases you saved on the old address stay there. Open them from your case link, or from the old address.";
