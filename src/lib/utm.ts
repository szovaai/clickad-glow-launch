export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export function captureUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
  };
}

export function saveUTMToSession(params: UTMParams): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('utm_params', JSON.stringify(params));
}

export function getUTMFromSession(): UTMParams {
  if (typeof window === 'undefined') return {};
  const stored = sessionStorage.getItem('utm_params');
  return stored ? JSON.parse(stored) : {};
}
