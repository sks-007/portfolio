import { NextResponse } from 'next/server';

export function proxy(req) {
  const url = req.nextUrl;
  
  // Determine if this route requires authentication
  const isAdminRoute = url.pathname.startsWith('/admin');
  
  // Protect all API routes that modify data (POST, PUT, DELETE), EXCEPT the contact form
  const isProtectedApi = 
    url.pathname.startsWith('/api') && 
    req.method !== 'GET' && 
    !url.pathname.startsWith('/api/contact');

  // If it's a public route, just let it pass immediately
  if (!isAdminRoute && !isProtectedApi) {
    return NextResponse.next();
  }

  // Check credentials for protected routes
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const decodedValue = Buffer.from(authValue, 'base64').toString('utf-8');
    
    const splitIndex = decodedValue.indexOf(':');
    if (splitIndex !== -1) {
      const user = decodedValue.substring(0, splitIndex);
      const pwd = decodedValue.substring(splitIndex + 1);

      const validUser = process.env.ADMIN_USERNAME;
      const validPass = process.env.ADMIN_PASSWORD;

      if (user === validUser && pwd === validPass) {
        return NextResponse.next();
      }
    }
  }

  // Deny access
  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Secure Area"',
    },
  });
}

export const config = {
  // Apply proxy to all admin AND all api routes so we can filter them inside the function
  matcher: ['/admin', '/admin/:path*', '/api/:path*'],
};
