import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // Use Buffer for base64 decoding (more reliable in Edge runtime than atob)
    const decodedValue = Buffer.from(authValue, 'base64').toString('utf-8');
    
    // Split by the FIRST colon only (in case password has special characters)
    const splitIndex = decodedValue.indexOf(':');
    if (splitIndex !== -1) {
      const user = decodedValue.substring(0, splitIndex);
      const pwd = decodedValue.substring(splitIndex + 1);

      const validUser = process.env.ADMIN_USERNAME || 'sachin';
      const validPass = process.env.ADMIN_PASSWORD || 'sachin123';

      if (user === validUser && pwd === validPass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Secure Area"',
    },
  });
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
