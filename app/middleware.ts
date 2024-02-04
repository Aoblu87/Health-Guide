import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();
  const path = url.pathname;

  // Definisci i percorsi consentiti per utenti autenticati e non autenticati
  const allowedPathsForGuests = ['/', '/public/dashboard', '/auth/login', '/auth/signup'];
  const allowedPathsForAuthenticatedUsers = ['/u', '/u/dashboard','/u/profile',];

  // Se l'utente è autenticato e tenta di accedere a pagine non consentite, reindirizzalo a '/u'
  if (session && !allowedPathsForAuthenticatedUsers.includes(path)) {
    url.pathname = '/u';
    return NextResponse.redirect(url);
  }

  // Se l'utente non è autenticato e tenta di accedere a pagine non consentite, reindirizzalo a '/'
  if (!session && !allowedPathsForGuests.includes(path)) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Nessun reindirizzamento necessario
  return NextResponse.next();
}

// Configura il middleware per escludere file statici e API routes
export const config = {
  matcher: [
    '/((?!_next).*)', // Esclude file statici sotto /_next
    
  ],
};
