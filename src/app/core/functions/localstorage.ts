import { jwtDecode } from "jwt-decode";
import { TokenProperties } from "../types/general";
// General local storage functions
export function SetLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify({ value: value }));
}

export function UpdateLocalStorage(key: string, value: any) {
  const storedValue = localStorage.getItem(key) ?? "{}";
  const parsedValue = JSON.parse(storedValue);
  localStorage.setItem(key, JSON.stringify({ value: value }));
}

export function GetLocalStorage(key: string) {
  const storedValue = localStorage.getItem(key);

  if (storedValue) {
    try {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue.value;
    } catch (error) {
      console.error('Error parsing local storage value:', error);
      return null;
    }
  }

  return null;
}

export function DeleteLocalStorage(key: string) {
  localStorage.removeItem(key);
}

// JWT-specific functions
export function SetToken(tokenKey: string, token: string) {
  SetLocalStorage(tokenKey, token);
}

export async function GetToken(tokenKey: string): Promise<TokenProperties> {
  return new Promise((resolve, reject) => {
    const token = GetLocalStorage(tokenKey);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp && Date.now() > decodedToken.exp * 1000) {
          DeleteLocalStorage(tokenKey);
          resolve({} as TokenProperties);
        }
        if (decodedToken.nbf && Date.now() < decodedToken.nbf * 1000) {
          DeleteLocalStorage(tokenKey);
          resolve({} as TokenProperties);
        }
        resolve(decodedToken as TokenProperties);
      } catch (error) {
        console.error('Error decoding token:', error);
        DeleteLocalStorage(tokenKey);
        resolve({} as TokenProperties);
      }
    } else {
      resolve({} as TokenProperties);
    }
  });
}

export function DeleteToken(tokenKey: string) {
  DeleteLocalStorage(tokenKey);
}
