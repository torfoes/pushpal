import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function getSessionTokenOrRedirect() {
    const cookieStore = cookies();
    const cookieName = process.env.NEXT_PUBLIC_AUTHJS_SESSION_COOKIE;

    if (!cookieName) {
        throw new Error('Environment variable NEXT_PUBLIC_AUTHJS_SESSION_COOKIE is not defined.');
    }

    const sessionToken = cookieStore.get(cookieName)?.value;

    if (!sessionToken) {
        redirect('/login');
    }

    return sessionToken;
}