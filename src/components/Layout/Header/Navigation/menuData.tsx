// src/data/menuData.tsx
import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/#courses" },
  { label: "Mentor", href: "/#mentor" },
  { label: "Group", href: "/#portfolio" },
  { label: "Testimonial", href: "/#testimonial" },
  {
    label: "Docs",
    href: "#", // parent doesn’t need a real link
    submenu: [
      { label: "Download Company Profile", href: "/docs/company-profile.pdf" },
      { label: "Download Price List", href: "/docs/price-list.pdf" },
    ],
  },
];
