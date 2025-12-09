import Header from "@/components/Header";
import PlantCard from "@/components/PlantCard";
import { usePosts } from "@/hooks/usePosts";
import { Skeleton } from "@/components/ui/skeleton";

// Image mapping for demo data
const imageMap: Record<string, string> = {
  "/src/assets/plant1.jpg": "/src/assets/plant1.jpg",
  "/src/assets/plant2.jpg": "/src/assets/plant2.jpg",
  "/src/assets/plant3.jpg": "/src/assets/plant3.jpg",
  "/src/assets/plant4.jpg": "/src/assets/plant4.jpg",
  "/src/assets/plant5.jpg": "/src/assets/plant5.jpg",
  "/src/assets/plant6.jpg": "/src/assets/plant6.jpg",
};

const getInitials = (name: string | null) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const Index = () => {
  const { data: posts, isLoading, error } = usePosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-destructive">Error al cargar los posts</p>
        )}

        {posts && posts.length === 0 && (
          <p className="text-center text-muted-foreground">No hay posts aún</p>
        )}

        {posts && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {posts.map((post) => (
              <PlantCard
                key={post.id}
                id={post.id}
                image={imageMap[post.image_url] || post.image_url}
                plantName={post.plant_name}
                description={post.description || ""}
                userName={post.profile?.username || "Usuario"}
                userInitials={getInitials(post.profile?.username)}
                likes={post.likes_count}
                comments={post.comments_count}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
