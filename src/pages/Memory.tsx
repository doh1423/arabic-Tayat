import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Camera, Heart, MessageCircle, Share, Eye, Upload, Filter } from "lucide-react";

interface Landmark {
  id: string;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
  category: string;
  memories: Memory[];
}

interface Memory {
  id: string;
  userNickname: string;
  image: string;
  caption: string;
  prayer: string;
  category: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked?: boolean;
}

interface Comment {
  id: string;
  userNickname: string;
  text: string;
  timestamp: string;
}

const landmarks: Landmark[] = [
  {
    id: "prophet-mosque",
    name: "المسجد النبوي الشريف",
    description: "قلب المدينة المنورة ومكان دفن النبي محمد ﷺ",
    coordinates: { lat: 24.4672, lng: 39.6117 },
    category: "مساجد",
    memories: [
      {
        id: "1",
        userNickname: "أم محمد",
        image: "/placeholder.svg",
        caption: "لحظة سكينة في الروضة الشريفة",
        prayer: "اللهم أنزل علي من بركات هذا المكان المبارك",
        category: "روحانية",
        likes: 47,
        comments: [
          { id: "1", userNickname: "فاطمة", text: "بارك الله فيك", timestamp: "منذ ساعة" }
        ],
        timestamp: "منذ 3 ساعات"
      },
      {
        id: "2",
        userNickname: "أبو عبدالله",
        image: "/placeholder.svg",
        caption: "أول زيارة مع العائلة",
        prayer: "ربنا تقبل منا إنك أنت السميع العليم",
        category: "عائلة",
        likes: 32,
        comments: [],
        timestamp: "منذ يوم"
      }
    ]
  },
  {
    id: "uhud",
    name: "جبل أحد",
    description: "الجبل الذي شهد غزوة أحد التاريخية",
    coordinates: { lat: 24.4965, lng: 39.6205 },
    category: "مواقع تاريخية",
    memories: [
      {
        id: "3",
        userNickname: "زائر من مصر",
        image: "/placeholder.svg",
        caption: "وقفة تأمل في موقع الغزوة",
        prayer: "اللهم ارزقنا الثبات كما ثبت الصحابة",
        category: "تاريخ",
        likes: 28,
        comments: [
          { id: "2", userNickname: "أحمد", text: "تبارك الله", timestamp: "منذ ساعتين" }
        ],
        timestamp: "منذ 5 ساعات"
      }
    ]
  }
];

const memoryCategories = ["الكل", "روحانية", "عائلة", "تاريخ", "طبيعة"];

const Memory = () => {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [showShareForm, setShowShareForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [showARView, setShowARView] = useState(false);
  
  const [newMemory, setNewMemory] = useState({
    caption: "",
    prayer: "",
    category: "روحانية"
  });

  const handleLike = (memoryId: string) => {
    console.log("Liked memory:", memoryId);
  };

  const handleShare = (memoryId: string) => {
    console.log("Shared memory:", memoryId);
  };

  const filteredMemories = selectedLandmark?.memories.filter(memory => 
    selectedCategory === "الكل" || memory.category === selectedCategory
  ) || [];

  if (showARView) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-heritage-gold/20 to-background flex items-center justify-center">
        <Card className="border-heritage-gold/20 max-w-md">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-heritage-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-12 w-12 text-heritage-gold" />
              </div>
              <h3 className="text-xl font-bold text-heritage-brown mb-2">شاهد الماضي</h3>
              <p className="text-muted-foreground">
                استخدم كاميرا هاتفك لمشاهدة الأحداث التاريخية في هذا المكان
              </p>
            </div>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-heritage-brown">
                تفعيل الكاميرا
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowARView(false)}
              >
                العودة للخريطة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showShareForm) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-md mx-auto">
          <Card className="border-heritage-gold/20">
            <CardHeader>
              <CardTitle className="text-heritage-brown text-center">
                خلّد لحظتك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline" className="mb-4">
                  <Upload className="mr-2 h-4 w-4" />
                  اختر صورة
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium">وصف اللحظة</label>
                <Textarea 
                  placeholder="شاركنا شعورك في هذا المكان المبارك..."
                  value={newMemory.caption}
                  onChange={(e) => setNewMemory({...newMemory, caption: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium">دعاء أو خاطرة</label>
                <Textarea 
                  placeholder="دعاء أو خاطرة من القلب..."
                  value={newMemory.prayer}
                  onChange={(e) => setNewMemory({...newMemory, prayer: e.target.value})}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-gradient-primary hover:opacity-90 text-heritage-brown"
                >
                  مشاركة
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowShareForm(false)}
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-heritage-brown mb-4">
          مرآة الذاكرة
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          شارك لحظاتك المقدسة واستكشف ذكريات الزوار الآخرين
        </p>
      </div>

      {selectedLandmark ? (
        <div className="max-w-4xl mx-auto">
          {/* Landmark Header */}
          <Card className="mb-6 border-heritage-gold/20">
            <CardContent className="p-6">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedLandmark(null)}
                className="mb-4"
              >
                ← العودة للخريطة
              </Button>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-heritage-brown mb-2">
                    {selectedLandmark.name}
                  </h2>
                  <p className="text-muted-foreground">{selectedLandmark.description}</p>
                </div>
                <Badge variant="secondary">{selectedLandmark.category}</Badge>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowShareForm(true)}
                  className="bg-gradient-primary hover:opacity-90 text-heritage-brown"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  خلّد لحظتك
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowARView(true)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  شاهد الماضي
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {memoryCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-heritage-gold text-heritage-brown" : ""}
                >
                  <Filter className="mr-1 h-3 w-3" />
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Memories Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredMemories.map((memory) => (
              <Card key={memory.id} className="border-heritage-gold/20 hover:shadow-heritage transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted rounded-t-lg mb-4"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-heritage-brown">{memory.userNickname}</span>
                      <Badge variant="outline" className="border-heritage-gold/30">
                        {memory.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm mb-3">{memory.caption}</p>
                    
                    {memory.prayer && (
                      <div className="bg-heritage-gold/10 p-3 rounded-lg mb-3">
                        <p className="text-sm italic text-heritage-brown">"{memory.prayer}"</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{memory.timestamp}</span>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleLike(memory.id)}
                          className="flex items-center gap-1 hover:text-red-500"
                        >
                          <Heart className="h-4 w-4" />
                          <span>{memory.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500">
                          <MessageCircle className="h-4 w-4" />
                          <span>{memory.comments.length}</span>
                        </button>
                        <button 
                          onClick={() => handleShare(memory.id)}
                          className="flex items-center gap-1 hover:text-green-500"
                        >
                          <Share className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Interactive Map Placeholder */}
          <Card className="mb-6 border-heritage-gold/20">
            <CardContent className="p-8">
              <div className="bg-gradient-to-b from-heritage-gold/20 to-heritage-gold/5 rounded-lg h-64 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-heritage-gold mx-auto mb-2" />
                  <p className="text-heritage-brown font-medium">خريطة المدينة التفاعلية</p>
                  <p className="text-sm text-muted-foreground">انقر على المعالم لاستكشاف الذكريات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Landmarks Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {landmarks.map((landmark) => (
              <Card 
                key={landmark.id} 
                className="border-heritage-gold/20 hover:shadow-heritage transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedLandmark(landmark)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-heritage-brown">{landmark.name}</CardTitle>
                    <Badge variant="secondary">{landmark.category}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{landmark.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {landmark.memories.length} ذكرية
                    </span>
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90 text-heritage-brown">
                      استكشف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Memory;