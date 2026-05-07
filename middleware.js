import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // No token + trying to access dashboard → go to login
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // Already logged in + tries to go to /login → redirect to dashboard
      if (pathname === '/login') {
        if (payload.role === 'admin') {
          return NextResponse.redirect(new URL('/dashboard/admin', request.url));
        } else {
          return NextResponse.redirect(new URL('/dashboard/user', request.url));
        }
      }

      // User tries to access /dashboard/admin → block
      if (pathname.startsWith('/dashboard/admin') && payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard/user', request.url));
      }

    } catch (err) {
      // Token invalid → clear and go to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};