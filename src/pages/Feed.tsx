import { useState } from "react";
import { Heart, MessageCircle, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data for social feed
const mockSwings = [
  {
    id: 1,
    user: { name: "Mike Johnson", avatar: "/placeholder.svg", handicap: 12 },
    videoThumbnail: "/placeholder.svg",
    progressScore: 85,
    tips: ["Keep your head steady", "Follow through more", "Improve stance"],
    date: "2024-01-15",
    likes: 24,
    comments: 8,
    rating: 8.5,
  },
  {
    id: 2,
    user: { name: "Sarah Williams", avatar: "/placeholder.svg", handicap: 8 },
    videoThumbnail: "/placeholder.svg",
    progressScore: 92,
    tips: ["Great swing speed", "Perfect balance", "Minor grip adjustment"],
    date: "2024-01-14",
    likes: 31,
    comments: 12,
    rating: 9.2,
  },
];

export default function Feed() {
  const [likedSwings, setLikedSwings] = useState<number[]>([]);

  const toggleLike = (swingId: number) => {
    setLikedSwings(prev => 
      prev.includes(swingId) 
        ? prev.filter(id => id !== swingId)
        : [...prev, swingId]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-golf text-white p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">NextRound</h1>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Social Feed
          </Badge>
        </div>
      </header>

      {/* Feed Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {mockSwings.map((swing) => (
          <Card key={swing.id} className="golf-card overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={swing.user.avatar} />
                    <AvatarFallback className="bg-golf text-white">
                      {swing.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{swing.user.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      Handicap: {swing.user.handicap} • {swing.date}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className="border-golf text-golf font-semibold"
                >
                  Score: {swing.progressScore}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src={swing.videoThumbnail} 
                  alt="Swing video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* AI Tips */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-golf">AI Analysis Tips:</h4>
                <div className="space-y-1">
                  {swing.tips.map((tip, index) => (
                    <p key={index} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-1.5 h-1.5 bg-golf rounded-full mr-2" />
                      {tip}
                    </p>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(swing.id)}
                    className={likedSwings.includes(swing.id) ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${likedSwings.includes(swing.id) ? "fill-current" : ""}`} />
                    {swing.likes + (likedSwings.includes(swing.id) ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {swing.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                    {swing.rating}
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  Compare
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Load More */}
        <div className="text-center pt-4">
          <Button variant="outline" size="lg">
            Load More Swings
          </Button>
        </div>
      </div>
    </div>
  );
}