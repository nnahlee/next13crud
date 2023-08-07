// csr
import Users from "./components/Users";
export const dynamic = "force-dynamic";
// ssr In Home page
async function getUsers() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/users`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("fetch failed");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const users = await getUsers();

  return <Users users={users} />;
}
