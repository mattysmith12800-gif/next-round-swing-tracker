import { useState } from "react";
import { Upload as UploadIcon, Video, Camera, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Upload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Mock upload limits
  const uploadsUsed = 3;
  const uploadLimit = 50;
  const isProUser = false;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check upload limit for free users
    if (!isProUser && uploadsUsed >= uploadLimit) {
      alert("Upload limit reached! Upgrade to Pro for unlimited uploads.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate AI analysis
    setTimeout(() => {
      setUploadedFile(URL.createObjectURL(file));
      setAnalysisResult({
        progressScore: Math.floor(Math.random() * 20) + 80,
        tips: [
          "Keep your head steady throughout the swing",
          "Follow through more completely",
          "Improve your stance width for better balance"
        ],
        strengths: [
          "Good tempo and rhythm",
          "Solid contact with the ball",
          "Proper grip positioning"
        ]
      });
      setIsUploading(false);
    }, 2500);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-golf text-white p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Upload Swing</h1>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {isProUser ? "Pro" : `${uploadsUsed}/${uploadLimit}`}
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Upload Limit Status */}
        {!isProUser && (
          <Card className="golf-card mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Upload Usage</h3>
                <Button variant="pro" size="sm">
                  Upgrade to Pro
                </Button>
              </div>
              <Progress value={(uploadsUsed / uploadLimit) * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {uploadsUsed} of {uploadLimit} free uploads used
              </p>
            </CardContent>
          </Card>
        )}

        {/* Upload Area */}
        {!uploadedFile && !isUploading && (
          <Card className="golf-card">
            <CardHeader>
              <div className="text-center">
                <Video className="h-12 w-12 mx-auto text-golf mb-4" />
                <h2 className="text-xl font-semibold mb-2">Upload Your Golf Swing</h2>
                <p className="text-muted-foreground">
                  Upload a video of your swing for AI analysis and improvement tips
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Button */}
              <div className="border-2 border-dashed border-golf-light rounded-lg p-8 text-center hover:bg-golf-light/5 transition-colors">
                <input
                  type="file"
                  accept="video/mp4,video/mov,video/quicktime"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <UploadIcon className="h-8 w-8 mx-auto text-golf mb-4" />
                  <p className="text-lg font-medium mb-2">Click to upload video</p>
                  <p className="text-sm text-muted-foreground">
                    Supports MP4, MOV files up to 100MB
                  </p>
                </label>
              </div>

              {/* Recording Tips */}
              <Alert>
                <Camera className="h-4 w-4" />
                <AlertDescription>
                  <strong>Recording Tips:</strong> Film from the side view, include full swing from setup to follow-through, 
                  ensure good lighting and stable camera position.
                </AlertDescription>
              </Alert>

              {/* Quick Tips */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-golf-light/30">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 text-golf">Best Angle</h4>
                    <p className="text-sm text-muted-foreground">
                      Side view, showing your full body from setup to follow-through
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-golf-light/30">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 text-golf">Lighting</h4>
                    <p className="text-sm text-muted-foreground">
                      Good natural light or well-lit indoor area for clear visibility
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <Card className="golf-card">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Sparkles className="h-12 w-12 mx-auto text-golf mb-4 animate-spin" />
                <h3 className="text-lg font-semibold mb-2">Analyzing Your Swing</h3>
                <p className="text-muted-foreground">
                  Our AI is processing your video and generating insights...
                </p>
              </div>
              <Progress value={uploadProgress} className="mb-4" />
              <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && uploadedFile && (
          <div className="space-y-6">
            {/* Video Preview */}
            <Card className="golf-card">
              <CardHeader>
                <h3 className="text-lg font-semibold">Your Swing Video</h3>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video 
                    src={uploadedFile} 
                    controls 
                    className="w-full h-full object-contain"
                  />
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card className="golf-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">AI Analysis Results</h3>
                  <Badge variant="outline" className="border-golf text-golf text-lg px-3 py-1">
                    Score: {analysisResult.progressScore}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Improvement Tips */}
                <div>
                  <h4 className="font-medium mb-3 text-golf flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {analysisResult.tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strengths */}
                <div>
                  <h4 className="font-medium mb-3 text-golf flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    What You're Doing Well
                  </h4>
                  <ul className="space-y-2">
                    {analysisResult.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <Button variant="golf" className="flex-1">
                    Save to Timeline
                  </Button>
                  <Button variant="outline" onClick={resetUpload}>
                    Upload Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pro Upgrade CTA */}
        {!isProUser && uploadsUsed >= uploadLimit - 10 && (
          <Card className="golf-card mt-6 border-golf bg-golf-light/5">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Running Low on Uploads</h3>
              <p className="text-muted-foreground mb-4">
                Upgrade to NextRound Pro for unlimited uploads and advanced features
              </p>
              <Button variant="pro" size="lg">
                Upgrade to Pro - $1.99/month
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}