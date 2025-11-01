import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => item.submenu && setSubmenuOpen(!submenuOpen)}
        className="flex items-center justify-between w-full py-2 text-muted focus:outline-none"
      >
        {item.href ? (
          <Link href={item.href}>{item.label}</Link>
        ) : (
          <span>{item.label}</span>
        )}

        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className={`transition-transform ${
              submenuOpen ? "rotate-180" : ""
            }`}
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
      </button>

      {submenuOpen && item.submenu && (
        <div className="bg-white p-2 w-full rounded shadow">
          {item.submenu.map((subItem, index) => (
            <a
              key={index}
              href={subItem.href}
              download
              className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded"
            >
              {subItem.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
