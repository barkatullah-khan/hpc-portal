import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 1. No token + trying to access dashboard → go to login
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      console.log("Current User Role:", payload.role); 

      // 2. Already logged in + tries to go to login or register → redirect home
      if (pathname === '/login' || pathname === '/register') {
        const dest = payload.role === 'admin' ? '/dashboard/admin' : '/dashboard/user';
        return NextResponse.redirect(new URL(dest, request.url));
      }

      // 3. Handle base "/dashboard" path (Redirect to correct sub-dashboard)
      if (pathname === '/dashboard') {
        const dest = payload.role === 'admin' ? '/dashboard/admin' : '/dashboard/user';
        return NextResponse.redirect(new URL(dest, request.url));
      }

      /// 4. Role Authorization
// Block non-admins from Admin dashboard
if (pathname.startsWith('/dashboard/admin') && payload.role !== 'admin') {
  return NextResponse.redirect(new URL('/dashboard/user', request.url));
}

// NEW: Force Admin to stay on Admin dashboard if they try to visit User dashboard
if (pathname.startsWith('/dashboard/user') && payload.role === 'admin') {
  return NextResponse.redirect(new URL('/dashboard/admin', request.url));
}

    } catch (err) {
      // Token invalid or expired → clear and go to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  // Added '/register' to the matcher
  matcher: ['/dashboard/:path*', '/login', '/register', '/dashboard']
};