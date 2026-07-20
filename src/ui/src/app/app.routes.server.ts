import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Depends on the redirect_flow_id query param supplied by GoCardless at
    // request time, so it must be rendered per-request, not prerendered.
    path: 'direct-debit/complete',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
