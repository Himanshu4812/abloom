import { ContactInfo, CompanyInfo } from "@/src/lib/types";

export const contactInfo: ContactInfo = {
  phone: "+91 976 618 0144",
  addressLines: [
    "41, Le Regalia Township, 6th Floor,",
    "B- Wing, Ambad Link Road,",
    "Nashik 422010",
  ],
  email: "hiranmayi0422@gmail.com",
};

export const companyInfo: CompanyInfo = {
  aboutUs: {
    title: "ABOUT US",
    description:
      "A Life Rooted in Green Luxury. Our villa communities are thoughtfully designed for those who seek more than just a home — they seek a lifestyle.",
  },
  companyInfo: {
    title: "COMPANY INFO",
    links: [
      { label: "About Us", href: "#" },
      { label: "Why Choose Us", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Awards and Recognition", href: "#" },
    ],
  },
  social: {
    title: "FOLLOW US",
    platforms: ["Facebook", "Twitter", "Instagram"],
  },
  copyright: "© 2025 – Hiranmayi. All rights reserved.",
};
