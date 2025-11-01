"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isLinkActive =
      path === item.href ||
      (item.submenu && item.submenu.some((subItem) => path === subItem.href));
    setIsActive(!!isLinkActive);
  }, [path, item.href, item.submenu]);

  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSubmenuOpen(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setSubmenuOpen(false), 200); // delay so user can move mouse
  };

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <Link
        href={item.href || "#"}
        className={`text-lg flex hover:text-black relative ${
          isActive
            ? "text-black after:absolute after:w-8 after:h-1 after:bg-primary after:rounded-full after:-bottom-1"
            : "text-grey"
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className="ml-1"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>

      {submenuOpen && item.submenu && (
        <div
          className="absolute py-2 left-0 mt-1 w-60 bg-white dark:bg-darklight dark:text-white shadow-lg rounded-lg z-50"
          onMouseEnter={openMenu} // keep open when inside submenu
          onMouseLeave={closeMenu} // close when leaving submenu
        >
          {item.submenu.map((subItem, index) => (
            <a
              key={index}
              href={subItem.href}
              download
              className="block px-4 py-2 text-black dark:text-white hover:bg-primary hover:text-white rounded"
            >
              {subItem.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
