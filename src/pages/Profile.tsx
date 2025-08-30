import { useState } from "react";
import { Camera, Settings, Trophy, TrendingUp, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    handicap: "12",
    avatar: "/placeholder.svg",
    plan: "free", // "free" or "pro"
    totalSwings: 15,
    bestScore: 92,
    averageScore: 78,
    improvement: "+12"
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // TODO: Save to Supabase
  };

  const handleUpgradeToPro = () => {
    // TODO: Integrate with Stripe
    console.log("Redirecting to Stripe checkout...");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-golf text-white p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card className="golf-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="bg-golf text-white text-xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  {profile.plan === "pro" && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600 bg-yellow-50">
                      <Crown className="h-3 w-3 mr-1" />
                      Pro
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{profile.email}</p>
                <p className="text-sm text-golf font-medium">Handicap: {profile.handicap}</p>
              </div>
            </div>

            {/* Subscription Status */}
            {profile.plan === "free" ? (
              <Card className="border-golf bg-golf-light/5 mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-golf">Upgrade to Pro</h3>
                      <p className="text-sm text-muted-foreground">
                        Unlimited uploads • Advanced analytics • Priority support
                      </p>
                    </div>
                    <Button variant="pro" onClick={handleUpgradeToPro}>
                      $1.99/month
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-yellow-500 bg-yellow-50 mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Crown className="h-5 w-5 text-yellow-600" />
                      <div>
                        <h3 className="font-semibold text-yellow-800">NextRound Pro</h3>
                        <p className="text-sm text-yellow-600">Active subscription</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Edit Form */}
            {isEditing && (
              <div className="space-y-4 p-4 bg-muted rounded-lg">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="handicap">Handicap</Label>
                  <Input 
                    id="handicap"
                    value={profile.handicap}
                    onChange={(e) => setProfile({...profile, handicap: e.target.value})}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="golf" onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="golf-card">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 mx-auto text-golf mb-2" />
              <div className="text-2xl font-bold text-golf">{profile.bestScore}</div>
              <div className="text-sm text-muted-foreground">Best Score</div>
            </CardContent>
          </Card>
          
          <Card className="golf-card">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-golf mb-2" />
              <div className="text-2xl font-bold text-golf">{profile.improvement}</div>
              <div className="text-sm text-muted-foreground">Improvement</div>
            </CardContent>
          </Card>
          
          <Card className="golf-card">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 mx-auto text-golf mb-2" />
              <div className="text-2xl font-bold text-golf">{profile.averageScore}</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </CardContent>
          </Card>
          
          <Card className="golf-card">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-golf mb-2" />
              <div className="text-2xl font-bold text-golf">{profile.totalSwings}</div>
              <div className="text-sm text-muted-foreground">Total Swings</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="golf-card">
          <CardHeader>
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Detailed Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Trophy className="h-4 w-4 mr-2" />
              Achievement History
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* Pro Features Preview */}
        {profile.plan === "free" && (
          <Card className="golf-card border-golf bg-golf-light/5">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-golf" />
                <h3 className="text-lg font-semibold text-golf">Pro Features</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-golf rounded-full mr-3" />
                Unlimited video uploads
              </div>
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-golf rounded-full mr-3" />
                Advanced swing analytics
              </div>
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-golf rounded-full mr-3" />
                Side-by-side comparisons
              </div>
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-golf rounded-full mr-3" />
                Priority AI analysis
              </div>
              <Button variant="pro" className="w-full mt-4" onClick={handleUpgradeToPro}>
                Upgrade Now - $1.99/month
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}