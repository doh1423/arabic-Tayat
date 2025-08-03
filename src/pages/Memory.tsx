import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Camera, Heart, MessageCircle, Share, Eye, Upload, Filter, Sparkles } from "lucide-react";

// Import images
import prophetMosqueImg from "@/assets/prophet-mosque.jpg";
import mountUhudImg from "@/assets/mount-uhud.jpg";
import islamicPatternImg from "@/assets/islamic-pattern.jpg";
import memoryConceptImg from "@/assets/memory-concept.jpg";

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
    <div className="min-h-screen bg-gradient-memory-bg">
      {/* Hero Header with Background */}
      <div className="relative overflow-hidden mb-8">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${memoryConceptImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative bg-gradient-memory-golden/90 backdrop-blur-sm">
          <div className="text-center py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                مرآة الذاكرة
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
                شارك لحظاتك المقدسة واستكشف ذكريات الزوار الآخرين في رحلة روحانية عبر تاريخ المدينة المنورة
              </p>
            </div>
          </div>
        </div>
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredMemories.map((memory) => (
              <Card 
                key={memory.id} 
                className="group overflow-hidden border-0 bg-gradient-memory-card transition-all duration-500 hover:scale-[1.02]"
                style={{ 
                  boxShadow: 'var(--shadow-memory-soft)',
                  borderRadius: '1.5rem'
                }}
              >
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-hsl(var(--memory-light)) to-hsl(var(--memory-secondary)) rounded-t-3xl relative overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage: `url(${islamicPatternImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-memory/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Camera className="h-8 w-8 text-hsl(var(--memory-primary))" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-hsl(var(--memory-accent))/90 text-white border-0 backdrop-blur-sm">
                        {memory.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-hsl(var(--memory-deep))">{memory.userNickname}</span>
                    <span className="text-xs text-hsl(var(--memory-primary))/60">{memory.timestamp}</span>
                  </div>
                  
                  <p className="text-sm text-hsl(var(--memory-deep))/80 leading-relaxed mb-4">{memory.caption}</p>
                  
                  {memory.prayer && (
                    <div className="bg-gradient-to-r from-hsl(var(--memory-light)) to-hsl(var(--memory-secondary))/50 p-4 rounded-xl mb-4 border-r-4 border-hsl(var(--memory-accent))">
                      <p className="text-sm italic text-hsl(var(--memory-deep)) leading-relaxed">"{memory.prayer}"</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-hsl(var(--memory-secondary))/50">
                    <div className="flex gap-6">
                      <button 
                        onClick={() => handleLike(memory.id)}
                        className="flex items-center gap-1.5 text-hsl(var(--memory-primary)) hover:text-red-500 transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="text-sm font-medium">{memory.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-hsl(var(--memory-primary)) hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">{memory.comments.length}</span>
                      </button>
                      <button 
                        onClick={() => handleShare(memory.id)}
                        className="flex items-center gap-1.5 text-hsl(var(--memory-primary)) hover:text-green-500 transition-colors"
                      >
                        <Share className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6">
          {/* Interactive Map with Islamic Pattern */}
          <Card className="mb-8 overflow-hidden" style={{ boxShadow: 'var(--shadow-memory)' }}>
            <CardContent className="p-0">
              <div className="relative h-80">
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url(${islamicPatternImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-memory/60 backdrop-blur-[1px]" />
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <MapPin className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">خريطة المدينة التفاعلية</h3>
                    <p className="text-white/80 text-sm">انقر على المعالم لاستكشاف الذكريات المقدسة</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Landmarks Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {landmarks.map((landmark, index) => {
              const landmarkImage = landmark.id === "prophet-mosque" ? prophetMosqueImg : mountUhudImg;
              return (
                <Card 
                  key={landmark.id} 
                  className="group overflow-hidden cursor-pointer border-0 bg-gradient-memory-card transition-all duration-500 hover:scale-[1.02]"
                  style={{ 
                    boxShadow: 'var(--shadow-memory-soft)',
                    borderRadius: '1.5rem'
                  }}
                  onClick={() => setSelectedLandmark(landmark)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={landmarkImage}
                      alt={landmark.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge 
                        className="bg-white/90 text-hsl(var(--memory-deep)) border-0 backdrop-blur-sm"
                      >
                        {landmark.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold mb-1 drop-shadow-lg">
                        {landmark.name}
                      </h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-hsl(var(--memory-deep))/80 text-sm leading-relaxed mb-4">
                      {landmark.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-hsl(var(--memory-primary))">
                        <Heart className="h-4 w-4" />
                        <span className="font-medium">{landmark.memories.length} ذكرية مقدسة</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-memory text-white border-0 hover:opacity-90 transition-all duration-300 hover:scale-105"
                      >
                        <Sparkles className="ml-2 h-4 w-4" />
                        استكشف
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Memory;