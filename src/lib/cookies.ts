interface CookieOptions {
  expires?: Date;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {},
) => {
  const defaultOptions: CookieOptions = {
    path: "/",
    secure: process.env.NODE_ENV === "production", // Only secure in production
    sameSite: "lax",
    ...options,
  };

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (defaultOptions.expires) {
    cookieString += `; expires=${defaultOptions.expires.toUTCString()}`;
  }

  if (defaultOptions.maxAge) {
    cookieString += `; max-age=${defaultOptions.maxAge}`;
  }

  if (defaultOptions.domain) {
    cookieString += `; domain=${defaultOptions.domain}`;
  }

  if (defaultOptions.path) {
    cookieString += `; path=${defaultOptions.path}`;
  }

  if (defaultOptions.secure) {
    cookieString += "; secure";
  }

  if (defaultOptions.httpOnly) {
    cookieString += "; httponly";
  }

  if (defaultOptions.sameSite) {
    cookieString += `; samesite=${defaultOptions.sameSite}`;
  }

  if (typeof document !== "undefined") {
    document.cookie = cookieString;
  }
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
};

export const deleteCookie = (
  name: string,
  options: Omit<CookieOptions, "expires" | "maxAge"> = {},
) => {
  setCookie(name, "", {
    ...options,
    expires: new Date(0),
  });
};

export const authCookies = {
  setAccessToken: (token: string, expiresAt: string) => {
    const expiresDate = new Date(expiresAt);
    setCookie("accessToken", token, {
      expires: expiresDate,
      secure: true,
      sameSite: "lax",
      // Note: httpOnly should be set server-side for maximum security
      // Client-side cookies can't be httpOnly, but server can set them
    });
  },

  getAccessToken: (): string | null => {
    return getCookie("accessToken");
  },

  removeAccessToken: () => {
    deleteCookie("accessToken");
  },

  setUserData: (userData: object) => {
    setCookie("userData", JSON.stringify(userData), {
      secure: true,
      sameSite: "lax",
    });
  },

  getUserData: (): object | null => {
    const userData = getCookie("userData");

    console.log("userData", userData);

    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error("Error parsing user data from cookie:", error);
        return null;
      }
    }
    return null;
  },

  removeUserData: () => {
    deleteCookie("userData");
  },

  clearAll: () => {
    authCookies.removeAccessToken();
    authCookies.removeUserData();
  },
};
