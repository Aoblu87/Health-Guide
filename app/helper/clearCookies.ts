'use server'
 
import { cookies } from 'next/headers'
 
export default async function clearCookies(name:string) {
  cookies().delete(name)
}
