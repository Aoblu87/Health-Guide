import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoginContext } from '@/context/loginContext'; // Aggiusta il percorso in base alla struttura del tuo progetto

// Hook personalizzato per gestire il reindirizzamento
const useAuthRedirect = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { login } = useContext(LoginContext);

 
    if (session && login) {
        return "u/"
    } else {
        return "public"
    }
}

export default useAuthRedirect;
