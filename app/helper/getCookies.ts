'use server'
 
import { cookies } from 'next/headers'
 
export default async function getCookies(name:string) {
  
 cookies().get(name)


}