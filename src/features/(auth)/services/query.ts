export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  currentUser: () => [...authKeys.user(), "current"] as const,
};
