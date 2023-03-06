//https://github.com/nextauthjs/next-auth/issues/596

export function refreshSession() {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
}
