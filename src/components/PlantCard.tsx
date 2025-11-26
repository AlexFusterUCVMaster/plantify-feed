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
  return <Card className="transition-all duration-500 border-2 border-primary bg-card rounded-none neon-border animate-slide-up group">
      <div className="p-4 flex items-center gap-3 border-b-2 border-primary/30 bg-muted/30">
        <Avatar className="h-10 w-10 border-2 border-primary animate-glow-pulse">
          <AvatarFallback className="bg-tertiary text-tertiary-foreground font-bold">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-primary drop-shadow-[0_0_8px_hsl(180_100%_50%)]">{userName}</p>
          <p className="text-xs text-secondary">HACE 2 HORAS</p>
        </div>
      </div>

      <div className="aspect-square overflow-hidden bg-muted border-y-2 border-primary/20 relative">
        <img 
          src={image} 
          alt={plantName} 
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" 
        />
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
              <Heart className={`h-5 w-5 transition-all duration-300 ${isLiked ? "fill-secondary text-secondary drop-shadow-[0_0_10px_hsl(320_100%_50%)]" : "text-accent"}`} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 border border-primary/30 transition-all duration-300 hover:shadow-[0_0_15px_hsl(180_100%_50%)]">
              <MessageCircle className="h-5 w-5 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-tertiary/20 border border-tertiary/30 transition-all duration-300 hover:shadow-[0_0_15px_hsl(270_100%_60%)]">
              <Share2 className="h-5 w-5 text-tertiary" />
            </Button>
          </div>
        </div>

        <p className="text-sm font-bold text-secondary mb-2 drop-shadow-[0_0_8px_hsl(320_100%_50%)]">
          {likes} ME GUSTA
        </p>

        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-bold text-primary">{userName}</span>{" "}
            <span className="text-accent font-medium">{plantName}</span>
          </p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {comments > 0 && <button className="text-sm text-tertiary mt-2 hover:text-secondary transition-colors font-medium hover:drop-shadow-[0_0_8px_hsl(270_100%_60%)]">
            VER LOS {comments} COMENTARIOS
          </button>}
      </div>
    </Card>;
};
export default PlantCard;