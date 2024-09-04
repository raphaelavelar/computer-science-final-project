export function getToken() {
    return localStorage.getItem("Token");
}

export function setToken(token: string) {
    localStorage.setItem("Token", token);
}