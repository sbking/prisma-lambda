import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await Promise.all([prisma.profile.deleteMany(), prisma.post.deleteMany()]);
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: seedUser,
  });

  await prisma.user.create({
    data: seedUser2,
  });

  console.log(`Database has been seeded. 🌱`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const seedUser: Prisma.UserCreateInput = {
  email: "jane@prisma.io",
  name: "Jane",
  profile: {
    create: {
      bio: "Health Enthusiast",
    },
  },
  posts: {
    create: [
      {
        title:
          "Comparing Database Types: How Database Types Evolved to Meet Different Needs",
        content:
          "https://www.prisma.io/blog/comparison-of-database-models-1iz9u29nwn37/",
      },
      {
        title: "Analysing Sleep Patterns: The Quantified Self",
        content: "https://quantifiedself.com/get-started/",
      },
      {
        title: "Prisma 2 Docs",
        content: "https://www.prisma.io/docs/",
      },
    ],
  },
};

const seedUser2: Prisma.UserCreateInput = {
  email: "toru@prisma.io",
  name: "Toru Takemitsu",
  profile: {
    create: {
      bio: "Musician",
    },
  },
  posts: {
    create: [
      {
        title: "Requiem for String Orchestra",
        content: "",
      },
      {
        title: "Music of Tree",
        content: "",
      },
      {
        title: "Waves for clarinet, horn, two trombones and bass drum ",
        content: "",
      },
    ],
  },
};
