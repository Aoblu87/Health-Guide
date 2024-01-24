export default function printCookie(name:string) {
    let cookieArray = document.cookie.split(';'); // Dividi la stringa dei cookie in un array
    for(let i = 0; i < cookieArray.length; i++) {
      let cookiePair = cookieArray[i].split('='); // Dividi il nome del cookie dal suo valore
      if(name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]); // Ritorna il valore del cookie
      }
    }
    return null; // Se il cookie non è trovato, ritorna null
  }
  
//   let cookieValue = getCookie('nomeDelTuoCookie'); // Sostituisci con il nome del tuo cookie
//   console.log(cookieValue);
  