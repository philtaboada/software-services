const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function take(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function takeUtm(search: string) {
  if (!search) return undefined;
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key.replace("utm_", "")] = value.slice(0, 120);
  }
  return Object.keys(utm).length ? utm : undefined;
}

function deviceHint(userAgent: string, width?: number) {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet/.test(ua)) return "tablet";
  if (/mobi|iphone|android/.test(ua)) return "mobile";
  if (width != null && width < 768) return "mobile";
  if (width != null && width < 1100) return "tablet";
  return "desktop";
}

function clientContext(raw: unknown) {
  if (!raw || typeof raw !== "object") return {};
  const input = raw as Record<string, unknown>;
  const search = take(input.search, 400);
  const width = typeof input.vw === "number" ? Math.round(input.vw) : undefined;
  const height = typeof input.vh === "number" ? Math.round(input.vh) : undefined;

  return {
    url: take(input.url, 500) || undefined,
    path: take(input.path, 300) || undefined,
    referrer: take(input.referrer, 500) || undefined,
    language: take(input.language, 32) || undefined,
    timezone: take(input.timezone, 80) || undefined,
    viewport: width && height ? { w: width, h: height } : undefined,
    dpr: typeof input.dpr === "number" ? Math.round(input.dpr * 100) / 100 : undefined,
    utm: takeUtm(search),
  };
}

function requestContext(request: Request) {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for") || "";
  const ip =
    forwarded.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "";
  const country = headers.get("x-vercel-ip-country") || "";
  const region = headers.get("x-vercel-ip-country-region") || "";
  const cityRaw = headers.get("x-vercel-ip-city") || "";
  const city = cityRaw ? decodeURIComponent(cityRaw) : "";

  return {
    ip: ip || undefined,
    userAgent: headers.get("user-agent")?.slice(0, 400) || undefined,
    geo:
      country || city
        ? { country: country || undefined, region: region || undefined, city: city || undefined }
        : undefined,
  };
}

export function collectClientContext() {
  const { href, pathname, search } = window.location;
  return {
    url: href,
    path: pathname,
    search,
    referrer: document.referrer || "",
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    vw: window.innerWidth,
    vh: window.innerHeight,
    dpr: window.devicePixelRatio,
  };
}

export function buildFeedbackMetadata({
  request,
  client,
  slug,
  source,
  rating,
  hasComment,
  wantsNewsletter,
}: {
  request: Request;
  client: unknown;
  slug: string;
  source: string;
  rating: number;
  hasComment: boolean;
  wantsNewsletter: boolean;
}) {
  const fromClient = clientContext(client);
  const fromRequest = requestContext(request);
  const width = fromClient.viewport?.w;

  return {
    slug,
    source,
    rating,
    hasComment,
    wantsNewsletter,
    ...fromClient,
    ...fromRequest,
    device: deviceHint(fromRequest.userAgent || "", width),
    timestamp: new Date().toISOString(),
  };
}
