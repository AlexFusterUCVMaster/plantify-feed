import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
interface PlantCardProps {
  image: string;
  plantName: string;
  description: string;
  userName: string;
  userInitials: string;
  likes: number;
  comments: number;
}
const PlantCard = ({
  image,
  plantName,
  description,
  userName,
  userInitials,
  likes: initialLikes,
  comments
}: PlantCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };
  return <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-border bg-card">
      <div className="p-4 flex items-center gap-3 border-b border-border">
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarFallback className="bg-secondary text-foreground font-medium">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-foreground">{userName}</p>
          <p className="text-xs text-muted-foreground">Hace 2 horas</p>
        </div>
      </div>

      <div className="aspect-square overflow-hidden bg-muted">
        <img src={image} alt={plantName} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>

      <div className="p-4 bg-lime-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-accent" onClick={handleLike}>
              <Heart className={`h-5 w-5 transition-colors ${isLiked ? "fill-accent text-accent" : "text-foreground"}`} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <MessageCircle className="h-5 w-5 text-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <Share2 className="h-5 w-5 text-foreground" />
            </Button>
          </div>
        </div>

        <p className="text-sm font-semibold text-foreground mb-1">
          {likes} me gusta
        </p>

        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-semibold text-foreground">{userName}</span>{" "}
            <span className="text-foreground">{plantName}</span>
          </p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {comments > 0 && <button className="text-sm text-muted-foreground mt-2 hover:text-foreground transition-colors">
            Ver los {comments} comentarios
          </button>}
      </div>
    </Card>;
};
export default PlantCard;