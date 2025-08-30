// src/Analytics.js
export const initGA = () => {
  if (window.gtag) {
    console.log("GA initialized");
  }
};

export const logPageView = (pagePath) => {
  if (window.gtag) {
    window.gtag("event", "page_view", { page_path: pagePath });
    console.log("Page view tracked:", pagePath);
  }
};

export const logEvent = (category, action, label) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
  }
};
