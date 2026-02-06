"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "home" },
    { href: "/over-thirty-five", label: "over 35®" },
    { href: "/leerdoelen", label: "leerdoelen" },
    { href: "/projecten", label: "projecten" },
    { href: "/reflectie", label: "reflectie" },
  ];

  return (
    <div className="sticky top-0 z-50 ">
      <div className="w-full h-3 bg-[#f1f1ec]"></div>
      <div className=" mx-auto w-4/5">
        <div className="navbar-notch">
          <nav>
            <ul className="flex justify-between px-25 py-5 text-gray-800 *:hover:tracking-widest *:hover:font-bold *:duration-100 origin-center">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={isActive ? "font-bold" : ""}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
