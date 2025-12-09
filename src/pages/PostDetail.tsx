import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Header from "@/components/Header";

// Mock data - en el futuro vendrá de una API
const mockPosts = {
  "1": {
    image: "/src/assets/plant1.jpg",
    plantName: "Monstera deliciosa",
    description:
      "Mi monstera está creciendo increíblemente bien este verano. Las hojas nuevas son enormes y tienen unas fenestras perfectas. Le he dado mucho amor y luz indirecta.",
    userName: "PlantLover23",
    userInitials: "PL",
    likes: 234,
    comments: [
      {
        id: 1,
        userName: "GreenThumb",
        userInitials: "GT",
        text: "¡Qué hermosa! ¿Qué fertilizante usas?",
        time: "hace 1 hora",
      },
      {
        id: 2,
        userName: "BotanicaFan",
        userInitials: "BF",
        text: "Las fenestras son perfectas 😍",
        time: "hace 2 horas",
      },
      {
        id: 3,
        userName: "JungleVibes",
        userInitials: "JV",
        text: "Me encanta cómo la tienes ubicada",
        time: "hace 3 horas",
      },
    ],
  },
  "2": {
    image: "/src/assets/plant2.jpg",
    plantName: "Pothos dorado",
    description:
      "Este pothos ha crecido más de 2 metros en solo 6 meses. Es increíble lo rápido que crece con el cuidado adecuado.",
    userName: "GreenThumb",
    userInitials: "GT",
    likes: 189,
    comments: [
      {
        id: 1,
        userName: "PlantLover23",
        userInitials: "PL",
        text: "¡Impresionante! ¿Lo tienes en agua o tierra?",
        time: "hace 30 min",
      },
      {
        id: 2,
        userName: "UrbanJungle",
        userInitials: "UJ",
        text: "Necesito consejos, el mío no crece tanto",
        time: "hace 1 hora",
      },
    ],
  },
  "3": {
    image: "/src/assets/plant3.jpg",
    plantName: "Ficus lyrata",
    description:
      "Mi ficus finalmente se está adaptando a su nueva ubicación. Las hojas nuevas son un buen indicador de que está feliz.",
    userName: "UrbanJungle",
    userInitials: "UJ",
    likes: 156,
    comments: [
      {
        id: 1,
        userName: "BotanicaFan",
        userInitials: "BF",
        text: "Los ficus son tan temperamentales, felicidades",
        time: "hace 2 horas",
      },
    ],
  },
  "4": {
    image: "/src/assets/plant4.jpg",
    plantName: "Suculenta Echeveria",
    description:
      "Esta echeveria está comenzando a florecer. Las flores naranjas son preciosas y contrastan perfectamente con las hojas azuladas.",
    userName: "SucculentQueen",
    userInitials: "SQ",
    likes: 201,
    comments: [
      {
        id: 1,
        userName: "DesertVibes",
        userInitials: "DV",
        text: "Las flores son espectaculares",
        time: "hace 4 horas",
      },
      {
        id: 2,
        userName: "CactusLover",
        userInitials: "CL",
        text: "¿Cuánto tiempo tardó en florecer?",
        time: "hace 5 horas",
      },
    ],
  },
  "5": {
    image: "/src/assets/plant5.jpg",
    plantName: "Calathea ornata",
    description:
      "Las calatheas son mis favoritas por sus patrones de hojas únicos. Esta es mi última adquisición y estoy enamorada.",
    userName: "TropicalVibes",
    userInitials: "TV",
    likes: 178,
    comments: [],
  },
  "6": {
    image: "/src/assets/plant6.jpg",
    plantName: "Pilea peperomioides",
    description: "Mi pilea está produciendo muchos hijuelos. Si alguien está interesado en intercambios, ¡avísenme!",
    userName: "PlantParent",
    userInitials: "PP",
    likes: 143,
    comments: [
      {
        id: 1,
        userName: "SwapPlants",
        userInitials: "SP",
        text: "¡Me interesa! Te escribo por mensaje",
        time: "hace 20 min",
      },
    ],
  },
};
const PostDetail = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const post = id ? mockPosts[id as keyof typeof mockPosts] : null;
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post?.likes || 0);
  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Post no encontrado</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al feed
        </Link>

        <Card className="border-2 border-primary bg-card rounded-none neon-border">
          <div className="p-4 flex items-center gap-3 border-b-2 border-primary/30 bg-muted/30">
            <Avatar className="h-10 w-10 border-2 border-primary animate-glow-pulse">
              <AvatarFallback className="bg-tertiary text-tertiary-foreground font-bold">
                {post.userInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-primary drop-shadow-[0_0_8px_hsl(180_100%_50%)]">{post.userName}</p>
              <p className="text-xs text-secondary">HACE 2 HORAS</p>
            </div>
          </div>

          <div className="overflow-hidden bg-muted border-y-2 border-primary/20">
            <img src={post.image} alt={post.plantName} className="h-50 w-50 object-cover" />
          </div>

          <div className="p-4 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent/20 border border-accent/30 transition-all duration-300 hover:shadow-[0_0_15px_hsl(140_100%_50%)]"
                  onClick={handleLike}
                >
                  <Heart
                    className={`h-5 w-5 transition-all duration-300 ${isLiked ? "fill-secondary text-secondary drop-shadow-[0_0_10px_hsl(320_100%_50%)]" : "text-accent"}`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/20 border border-primary/30 transition-all duration-300 hover:shadow-[0_0_15px_hsl(180_100%_50%)]"
                >
                  <MessageCircle className="h-5 w-5 text-primary" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-tertiary/20 border border-tertiary/30 transition-all duration-300 hover:shadow-[0_0_15px_hsl(270_100%_60%)]"
                >
                  <Share2 className="h-5 w-5 text-tertiary" />
                </Button>
              </div>
            </div>

            <p className="text-sm font-bold text-secondary mb-2 drop-shadow-[0_0_8px_hsl(320_100%_50%)]">
              {likes} ME GUSTA
            </p>

            <div className="space-y-1 mb-6">
              <p className="text-sm">
                <span className="font-bold text-primary">{post.userName}</span>{" "}
                <span className="text-accent font-medium">{post.plantName}</span>
              </p>
              <p className="text-sm text-muted-foreground">{post.description}</p>
            </div>

            {/* Comments Section */}
            <div className="border-t-2 border-primary/20 pt-4">
              <h3 className="text-sm font-bold text-secondary mb-4 drop-shadow-[0_0_8px_hsl(320_100%_50%)]">
                {post.comments.length} COMENTARIOS
              </h3>

              {post.comments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay comentarios aún. ¡Sé el primero en comentar!
                </p>
              ) : (
                <div className="space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8 border border-primary/50">
                        <AvatarFallback className="bg-tertiary/50 text-tertiary-foreground text-xs font-bold">
                          {comment.userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-bold text-primary">{comment.userName}</span>{" "}
                          <span className="text-muted-foreground">{comment.text}</span>
                        </p>
                        <p className="text-xs text-secondary mt-1">{comment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default PostDetail;
