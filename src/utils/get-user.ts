import { User } from "oidc-react";

function getUser() {
    console.log(`oidc.user:${process.env.NEXT_PUBLIC_OPIC_AUTHORITY}:${process.env.NEXT_PUBLIC_OPIC_CLIENT_ID}`);
    
    const oidcStorage = sessionStorage.getItem(`oidc.user:${process.env.NEXT_PUBLIC_OPIC_AUTHORITY}:${process.env.NEXT_PUBLIC_OPIC_CLIENT_ID}`)
    if (!oidcStorage) {
        return null;
    }

    return User.fromStorageString(oidcStorage);
}

export {getUser}