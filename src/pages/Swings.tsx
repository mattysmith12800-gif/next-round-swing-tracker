import { useState } from "react";
import { Calendar, TrendingUp, Play, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock user swing data
const mockUserSwings = [
  {
    id: 1,
    date: "2024-01-15",
    progressScore: 85,
    tips: ["Keep your head steady", "Follow through more", "Improve stance"],
    videoThumbnail: "/placeholder.svg",
    improvement: "+5",
  },
  {
    id: 2,
    date: "2024-01-10",
    progressScore: 80,
    tips: ["Good tempo", "Work on backswing", "Solid contact"],
    videoThumbnail: "/placeholder.svg",
    improvement: "+3",
  },
  {
    id: 3,
    date: "2024-01-05",
    progressScore: 77,
    tips: ["More hip rotation", "Straighten left arm", "Better follow-through"],
    videoThumbnail: "/placeholder.svg",
    improvement: "+2",
  },
];

export default function Swings() {
  const [selectedSwings, setSelectedSwings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("date");

  const toggleSwingSelection = (swingId: number) => {
    setSelectedSwings(prev => {
      if (prev.includes(swingId)) {
        return prev.filter(id => id !== swingId);
      } else if (prev.length < 2) {
        return [...prev, swingId];
      } else {
        return [prev[1], swingId]; // Replace first selection
      }
    });
  };

  const canCompare = selectedSwings.length === 2;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-golf text-white p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Swings</h1>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {mockUserSwings.length} Total
          </Badge>
        </div>
      </header>

      {/* Progress Overview */}
      <div className="container mx-auto px-4 py-6">
        <Card className="golf-card mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Progress Overview</h2>
              <Button variant="golf" size="sm">
                <BarChart3 className="h-4 w-4 mr-1" />
                View Stats
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-golf">85</div>
                <div className="text-sm text-muted-foreground">Latest Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-golf">+8</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-golf">{mockUserSwings.length}</div>
                <div className="text-sm text-muted-foreground">Total Swings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="score">Sort by Score</SelectItem>
              <SelectItem value="improvement">Sort by Progress</SelectItem>
            </SelectContent>
          </Select>

          {canCompare && (
            <Button variant="golf" size="sm">
              Compare Selected ({selectedSwings.length})
            </Button>
          )}
        </div>

        {/* Selection Helper */}
        {selectedSwings.length > 0 && (
          <div className="mb-4 p-3 bg-golf-light/10 border border-golf-light rounded-lg">
            <p className="text-sm text-golf">
              {selectedSwings.length === 1 
                ? "Select one more swing to compare" 
                : "Ready to compare! Click 'Compare Selected' above."
              }
            </p>
          </div>
        )}

        {/* Swing Timeline */}
        <div className="space-y-4">
          {mockUserSwings.map((swing) => (
            <Card 
              key={swing.id} 
              className={`golf-card cursor-pointer transition-all ${
                selectedSwings.includes(swing.id) 
                  ? "ring-2 ring-golf bg-golf-light/5" 
                  : "hover:shadow-golf"
              }`}
              onClick={() => toggleSwingSelection(swing.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  {/* Video Thumbnail */}
                  <div className="relative w-24 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={swing.videoThumbnail} 
                      alt="Swing video"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Swing Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{swing.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-golf text-golf">
                          Score: {swing.progressScore}
                        </Badge>
                        {swing.improvement && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {swing.improvement}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* AI Tips Preview */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-medium text-golf">Key Tips:</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {swing.tips.slice(0, 2).join(" • ")}
                      </p>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedSwings.includes(swing.id) && (
                    <div className="w-6 h-6 bg-golf rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {selectedSwings.indexOf(swing.id) + 1}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Limit Warning */}
        <Card className="golf-card mt-6 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-orange-800">Upload Limit</h3>
                <p className="text-sm text-orange-600">
                  {mockUserSwings.length} of 50 free uploads used
                </p>
              </div>
              <Button variant="pro" size="sm">
                Upgrade to Pro
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}