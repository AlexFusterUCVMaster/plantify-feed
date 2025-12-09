import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Share2, Bomb, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Header from "@/components/Header";
import { usePost } from "@/hooks/usePosts";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import CommentForm from "@/components/CommentForm";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
const getInitials = (name: string | null) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatTime = (dateString: string) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: es });
};

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: post, isLoading, error } = usePost(id);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleCommentAdded = () => {
    queryClient.invalidateQueries({ queryKey: ["post", id] });
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase.from("comments").delete().eq("id", commentId);
      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      toast({
        title: "Comentario eliminado",
        description: "El comentario se ha eliminado correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar el comentario",
        variant: "destructive",
      });
    }
  };

  const canDeleteComment = (commentUserId: string) => {
    if (!user) return false;
    return user.id === commentUserId || user.id === post?.user_id;
  };

  // Update likes when post loads
  useState(() => {
    if (post) {
      setLikes(post.likes_count);
    }
  });

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="aspect-video w-full" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Post no encontrado</p>
          <Link
            to="/"
            className="block text-center mt-4 text-primary hover:text-accent transition-colors"
          >
            Volver al feed
          </Link>
        </div>
      </div>
    );
  }

  const displayLikes = likes || post.likes_count;

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
                {getInitials(post.profile?.username)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-primary drop-shadow-[0_0_8px_hsl(180_100%_50%)]">
                {post.profile?.username || "Usuario"}
              </p>
              <p className="text-xs text-secondary">{formatTime(post.created_at).toUpperCase()}</p>
            </div>
          </div>

          <div className="overflow-hidden bg-muted border-y-2 border-primary/20">
            <img src={post.image_url} alt={post.plant_name} className="h-50 w-50 object-cover" />
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
                  <Bomb
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
              {displayLikes} ME GUSTA
            </p>

            <div className="space-y-1 mb-6">
              <p className="text-sm">
                <span className="font-bold text-primary">{post.profile?.username || "Usuario"}</span>{" "}
                <span className="text-accent font-medium">{post.plant_name}</span>
              </p>
              <p className="text-sm text-muted-foreground">{post.description}</p>
            </div>

            {/* Comments Section */}
            <div className="border-t-2 border-primary/20 pt-4">
              <h3 className="text-sm font-bold text-secondary mb-4 drop-shadow-[0_0_8px_hsl(320_100%_50%)]">
                {post.comments?.length || 0} COMENTARIOS
              </h3>

              {(!post.comments || post.comments.length === 0) ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay comentarios aún. ¡Sé el primero en comentar!
                </p>
              ) : (
                <div className="space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8 border border-primary/50">
                        <AvatarFallback className="bg-tertiary/50 text-tertiary-foreground text-xs font-bold">
                          {getInitials(comment.profile?.username)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm">
                            <span className="font-bold text-primary">
                              {comment.profile?.username || "Usuario"}
                            </span>{" "}
                            <span className="text-muted-foreground">{comment.content}</span>
                          </p>
                          {canDeleteComment(comment.user_id) && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-secondary mt-1">
                          {formatTime(comment.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <CommentForm postId={id!} onCommentAdded={handleCommentAdded} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostDetail;
