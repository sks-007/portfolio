import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // We only want to protect the /admin route and its sub-routes
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // Decode base64 credentials
    const [user, pwd] = atob(authValue).split(':');

    // Get credentials from environment variables, fallback to defaults if not set
    const validUser = process.env.ADMIN_USERNAME || 'sachin';
    const validPass = process.env.ADMIN_PASSWORD || 'sachin123';

    if (user === validUser && pwd === validPass) {
      return NextResponse.next();
    }
  }

  // If no authorization header or wrong credentials, prompt for password
  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Secure Area"',
    },
  });
}

// Apply this middleware ONLY to the admin pages
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
