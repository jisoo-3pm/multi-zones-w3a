import Link from "next/link";

const COMMON_URL =
  process.env.NEXT_PUBLIC_COMMON_URL || "http://localhost:3000";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href={`${COMMON_URL}`}>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href={`${COMMON_URL}/music`}>
            <a>Music</a>
          </Link>
        </li>
        <li>
          <Link href={`${COMMON_URL}/ticket`}>
            <a>Ticket</a>
          </Link>
        </li>
        <li>
          <Link href={`/detail`}>
            <a>Ticket Detail</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
