import { prisma } from "../db/connect";
import { faker } from "@faker-js/faker";

async function createPost() {
  try {
    const post = await prisma.post.create({
      data: {
        text: "this is a test post",
        rating: 5,
        author: {
          connect: {
            id: 1,
          },
        },
      },
    });

    console.log("created post");
  } catch (error) {
    console.log(error);
  }
}

createPost()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });

/*
async function deleteUsers() {
  try {
    await prisma.user.deleteMany();
    console.log("successfully deleted all users in db");
  } catch (err) {
    console.log(err);
  }
}

deleteUsers()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });



// npx prisma db seed
async function generateRandomUsers() {
  const numUsers = 4;
  const randomUsers = Array.from({ length: numUsers }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));

  try {
    const users = await prisma.user.createMany({
      data: randomUsers,
    });

    console.log("users created successfully");
  } catch (err) {
    console.log("error creating users");
    console.log(err);
  }
}

generateRandomUsers()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });

*/
