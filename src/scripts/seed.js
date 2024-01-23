const { PostModel } = require("./syncDB");
const posts = require("./data");
const uuid = require("uuid");

async function seedPosts(posts) {
  console.log("Inserting posts");

  try {
    const insertedPosts = await Promise.all(
      posts.map(async (post) => {
        post.id = uuid.v4();
        const createdPost = await PostModel.create(post);
        console.log(`Post inserted: ${createdPost.title}`);
        return createdPost;
      })
    );

    console.log("Posts inserted successfully");
    return insertedPosts;
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw new Error("Failed to seed posts");
  }
}

seedPosts(posts)
  .then(() => process.exit())
  .catch((err) => {
    console.error(err);
    process.exit(1); // Exit code 1 with an error
  });
