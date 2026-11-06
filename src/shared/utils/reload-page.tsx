export const reloadPage = (href?: string) => {
  if (typeof window !== 'undefined') {
    if (href) {
      window.location.href = href;
    } else {
      window.location.reload();
    }
  }
};
