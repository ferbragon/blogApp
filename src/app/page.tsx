// Server component
import { getPosts } from "@/lib/data";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import PostCardsContainer from "@/components/PostCardsContainer";

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center container mx-auto background">
      <NavBar />
      <HeroSection />
      <PostCardsContainer posts={posts} />
    </main>
  );
}
