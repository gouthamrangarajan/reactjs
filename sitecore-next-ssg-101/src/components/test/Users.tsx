import { motion } from 'framer-motion';
import Menu from './Menu';

interface userType {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}
export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  let dt = await res.json();
  dt = dt.map((el: userType) => ({
    name: el.name,
    username: el.username,
    email: el.email,
    website: el.website,
  }));
  return { dt };
};
function Users({ dt }: { dt: userType[] }) {
  return (
    <div className="test">
      <Menu></Menu>
      <table className="users">
        <thead>
          <tr>
            <th>Name</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {dt.map((el, index) => (
            <motion.tr
              key={el.email}
              initial={{ opacity: 0, x: 2 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { type: 'spring', damping: 9, duration: 0.5 * index },
              }}
            >
              <td>{el.name}</td>
              <td>{el.username}</td>
              <td>{el.email}</td>
              <td>{el.website}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
