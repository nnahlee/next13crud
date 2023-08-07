// csr
import Users from "./components/Users";
import AddUser from "./components/AddUser";
// import { prisma } from "../../db/connect";
// ssr In Home page
async function getUsers() {
  // revalidate crud state from server every 4s
  const res = await fetch(`http://localhost:3000/api/users`, {
    next: {
      revalidate: 4,
    },
  });

  if (!res.ok) {
    throw new Error("fetch failed");
  }
  return res.json();
}

export default async function Home() {
  const users = await getUsers();

  return <Users users={users} />;
}
