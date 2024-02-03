// hooks/useAuthRedirect.ts
import { useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRouter as usePathRouter } from 'next/router';

import { LoginContext } from '@/context/loginContext'; // Assicurati che il percorso sia corretto

const useAuthRedirect = () => {
  const { status } = useSession(); // Stato della sessione di NextAuth
  const { login } = useContext(LoginContext); // Il tuo stato di login personalizzato
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = status === 'authenticated' && login;
    const path = router.pathname;

    // Definisci i percorsi consentiti per utenti autenticati e non autenticati
    const allowedPathsForGuests = ['/', '/public/dashboard'];
    const allowedPathsForAuthenticatedUsers = ['/u', '/u/dashboard'];

    // Controlla se l'utente sta tentando di accedere a una pagina non consentita
    if (!isAuthenticated && !allowedPathsForGuests.includes(path)) {
      // Reindirizza utenti non autenticati a '/' se tentano di accedere a pagine non consentite
      router.push('/');
    } else if (isAuthenticated && !allowedPathsForAuthenticatedUsers.includes(path)) {
      // Reindirizza utenti autenticati a '/u' se tentano di accedere a pagine non consentite
      router.push('/u');
    }
    // Se l'utente autenticato è su una pagina consentita o l'utente non autenticato è su una pagina consentita, non fare nulla
  }, [status, login,router]);
};

export default useAuthRedirect;
