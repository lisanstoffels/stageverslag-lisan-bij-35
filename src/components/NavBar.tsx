import Link from "next/link";

export function NavBar() {
  return (
    <nav className="sticky top-3 mx-auto w-4/5 rounded-full bg-gray-50">
      <ul className="flex justify-between px-30 py-5 text-gray-800">
        <li><Link href="/">home</Link></li>
        <li><Link href="/over-thirty-five">over 35®</Link></li>
        <li><Link href="/leerdoelen">leerdoelen</Link></li>
        <li><Link href="/projecten">projecten</Link></li>
        <li><Link href="/reflectie">reflectie</Link></li>
      </ul>
    </nav>
  );
}
