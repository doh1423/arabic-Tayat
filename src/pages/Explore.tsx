import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Heart, MessageCircle, Share } from "lucide-react";

interface Landmark {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  photos: Photo[];
}

interface Photo {
  id: string;
  url: string;
  user: string;
  likes: number;
  comments: number;
  description: string;
}

const landmarks: Landmark[] = [
  {
    id: "1",
    name: "المسجد النبوي",
    description: "أحد أقدس المساجد في الإسلام ومكان دفن النبي محمد صلى الله عليه وسلم",
    coordinates: [24.4672, 39.6117],
    photos: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1544531586-fbb6cf2d60c0",
        user: "أحمد العلي",
        likes: 45,
        comments: 12,
        description: "منظر رائع للمسجد النبوي في وقت المغرب"
      }
    ]
  },
  {
    id: "2", 
    name: "جبل أحد",
    description: "الجبل الشهير الذي وقعت عنده غزوة أحد",
    coordinates: [24.5247, 39.6484],
    photos: [
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        user: "فاطمة محمد",
        likes: 32,
        comments: 8,
        description: "إطلالة جميلة على جبل أحد"
      }
    ]
  }
];

const Explore = () => {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-heritage-brown mb-2">
            استكشاف المدينة المنورة
          </h1>
          <p className="text-muted-foreground">
            اكتشف المعالم التاريخية وشارك تجربتك
          </p>
        </header>

        {/* Interactive Map Placeholder */}
        <Card className="mb-6 border-heritage-gold/20">
          <CardContent className="p-6">
            <div className="bg-heritage-beige rounded-lg h-64 flex items-center justify-center mb-4">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-2 text-heritage-gold" />
                <p>خريطة تفاعلية للمعالم التاريخية</p>
                <p className="text-sm">سيتم إضافة خريطة حقيقية هنا</p>
              </div>
            </div>
            
            {/* Landmark Buttons */}
            <div className="flex flex-wrap gap-2">
              {landmarks.map((landmark) => (
                <Button
                  key={landmark.id}
                  variant={selectedLandmark?.id === landmark.id ? "default" : "outline"}
                  onClick={() => setSelectedLandmark(landmark)}
                  className="text-sm"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {landmark.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Landmark Details */}
        {selectedLandmark && (
          <Card className="mb-6 border-heritage-gold/20 shadow-heritage">
            <CardHeader>
              <CardTitle className="text-heritage-brown flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-heritage-gold" />
                {selectedLandmark.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {selectedLandmark.description}
              </p>
              
              <Button className="mb-4 bg-gradient-primary hover:opacity-90">
                <Camera className="h-4 w-4 mr-2" />
                مشاركة صورة جديدة
              </Button>

              {/* Photo Gallery */}
              <div className="space-y-4">
                <h3 className="font-semibold text-heritage-brown">صور من المجتمع</h3>
                {selectedLandmark.photos.map((photo) => (
                  <Card key={photo.id} className="border-heritage-beige/50">
                    <CardContent className="p-4">
                      <img 
                        src={photo.url} 
                        alt={photo.description}
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-heritage-brown">
                          {photo.user}
                        </span>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Badge variant="secondary" className="text-xs">
                            <Heart className="h-3 w-3 mr-1" />
                            {photo.likes}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {photo.comments}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {photo.description}
                      </p>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Heart className="h-4 w-4 mr-1" />
                          إعجاب
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          تعليق
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Share className="h-4 w-4 mr-1" />
                          مشاركة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Explore;