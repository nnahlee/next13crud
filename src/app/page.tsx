// csr
import Users from "./components/Users";

// ssr In Home page
async function getUsers() {
  // revalidate crud state from server every 4s
  const res = await fetch(`${process.env.BASE_URL}/api/users`);

  return res.json();
}

export default async function Home() {
  const users = await getUsers();

  return <Users users={users} />;
}
