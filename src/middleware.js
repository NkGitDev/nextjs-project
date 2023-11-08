import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log('middleware executed...!!')
//   return NextResponse.redirect(new URL('/home', request.url))

    const loginToken = request.cookies.get('loginToken')?.value

    if(request.nextUrl.pathname === '/api/login' || request.nextUrl.pathname === '/api/users'){
        return;
    }

    const loggedInSecurePath = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup'
    

    if (loggedInSecurePath) {
        // access not secured route
        if(loginToken){
            if (request.nextUrl.pathname === '/profile/user') {
                return NextResponse.redirect(new URL('/profile/user', request.url))
                
            }
        }
    } else {
        // access secured route
        if(!loginToken){

            if (request.nextUrl.pathname.startsWith('/api')) {
                return NextResponse.json({
                    message:'Access Denied',
                    success:false
                },{status:401})
            }

            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/add-tasks",
    "/show-tasks",
    "/api/:path*",
    "/profile/:path*",
  ],
}