'use server'
 
import { cookies } from 'next/headers'
 
export default async function getCookies(name:string) {
  
 const cookie= cookies().get(name)
 return cookie


}