// Business details shown across the site. Change them here.
export const business = {
  name: "APC Motor Group",
  stockBrand: "Performance Vehicle Warehouse",
  owner: "Angelo",
  mobile: "0438 908 560",
  mobileTel: "0438908560",
  office: "(08) 9528 1234",
  officeTel: "0895281234",
  address: "14 Hammond Road, Cockburn Central WA",
  dealerLicence: "DL 22855",
  facebook: "https://www.facebook.com/ApcMotorGroup",
  years: "31+",
  // What Google Maps searches for, for the map and "Get directions".
  mapQuery: "14 Hammond Road, Cockburn Central WA 6164",
  // The business's Google profile. Paste the "Share" link from Google Maps here
  // to point the review buttons straight at it.
  googleProfileUrl: "https://www.google.com/search?q=Performance+Vehicle+Warehouse+APC+Motor+Group+Perth+reviews",
};

export type Review = { name: string; rating: number; text: string; when?: string };

// Hand-picked Google reviews, copied word for word from the business's Google
// profile. Only add real reviews. Used when live Google reviews aren't set up.
export const reviews: Review[] = [];
