import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add CORS headers for the auth endpoints
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    const response = NextResponse.next()
    
    response.headers.set('Access-Control-Allow-Origin', 'https://new-team-estimate-app-backend.onrender.com')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}