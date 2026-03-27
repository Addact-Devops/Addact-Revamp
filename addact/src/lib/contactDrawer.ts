export const CONTACT_DRAWER_EVENT = "addact:open-contact-drawer";

const CONTACT_DRAWER_SENTINELS = new Set(["contactusmodel", "contactusmodal"]);

export const shouldOpenContactDrawer = (href?: string | null) => {
  const value = href?.trim().toLowerCase();

  if (!value) {
    return false;
  }

  return (
    CONTACT_DRAWER_SENTINELS.has(value) ||
    value === "/contact-us" ||
    value.startsWith("/contact-us?") ||
    value.startsWith("/contact-us#")
  );
};

export const openContactDrawer = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(CONTACT_DRAWER_EVENT));
};
