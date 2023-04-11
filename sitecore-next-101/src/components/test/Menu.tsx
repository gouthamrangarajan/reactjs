import Link from 'next/link';

function Menu() {
  return (
    <div className="test">
      <ul className="menu">
        <li>
          <Link href="/test">Home</Link>
        </li>
        <li>
          <Link href="/test/users">Users</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
