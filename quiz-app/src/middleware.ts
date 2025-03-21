import { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async ({ request, locals }, next) => {
  const url = new URL(request.url);

  // Redirect from `/` to `/en` if no language is specified
  if (url.pathname === '/') {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/en',
      },
    });
  }

  // Continue to the next middleware or route
  return next();
};