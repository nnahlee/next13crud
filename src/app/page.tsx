// csr
import Users from "./components/Users";
import { prisma } from "../../db/connect";
// // ssr In Home page

export default async function Home() {
  const users = await prisma.user.findMany();

  return <Users users={users} />;
}
