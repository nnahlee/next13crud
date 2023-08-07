// csr
import Users from "./components/Users";
import { prisma } from "../../db/connect";
// // ssr In Home page

// revalidate every 1s
export const revalidate = 1;
export default async function Home() {
  // console.log(process.env.BASE_URL);
  const users = await prisma.user.findMany();

  return <Users users={users} />;
}
