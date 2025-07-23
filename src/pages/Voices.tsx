import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Play, 
  Pause, 
  Heart, 
  MessageCircle, 
  Share, 
  Plus,
  Upload,
  Mic,
  Volume2,
  User,
  MapPin,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface VoiceStory {
  id: string;
  title: string;
  author: string;
  authorImage?: string;
  content: string;
  audioUrl?: string;
  duration: string;
  likes: number;
  comments: number;
  location: string;
  category: string;
  isApproved: boolean;
  createdAt: string;
}

const voiceStories: VoiceStory[] = [
  {
    id: "1",
    title: "ذكريات طفولتي في حارة الأغوات",
    author: "أم محمد الأنصارية",
    authorImage: "/placeholder.svg",
    content: "كنا نلعب في الحارات الضيقة قرب المسجد النبوي، والصوت العذب للمؤذن يملأ المكان بالسكينة...",
    audioUrl: "#",
    duration: "5:32",
    likes: 45,
    comments: 12,
    location: "حارة الأغوات",
    category: "ذكريات",
    isApproved: true,
    createdAt: "منذ يومين"
  },
  {
    id: "2", 
    title: "حكايات السوق القديم",
    author: "عبدالله الحرمي",
    content: "في السوق القديم كان التجار يتعاملون بالثقة والأمانة، وكل محل له حكاية...",
    audioUrl: "#",
    duration: "7:18",
    likes: 67,
    comments: 23,
    location: "السوق القديم",
    category: "تجارة وحرف",
    isApproved: true,
    createdAt: "منذ 3 أيام"
  },
  {
    id: "3",
    title: "ليالي رمضان في المدينة",
    author: "فاطمة المدينية", 
    content: "في رمضان تتغير المدينة، الأجواء الروحانية والتراويح في الحرم...",
    duration: "4:45",
    likes: 89,
    comments: 34,
    location: "المسجد النبوي",
    category: "مواسم دينية",
    isApproved: true,
    createdAt: "منذ أسبوع"
  }
];

const categories = ["الكل", "ذكريات", "تجارة وحرف", "مواسم دينية", "تراث شعبي", "أحياء قديمة"];

const Voices = () => {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [showAddForm, setShowAddForm] = useState(false);
  const [playingStory, setPlayingStory] = useState<string | null>(null);
  const [likedStories, setLikedStories] = useState<string[]>([]);

  // نموذج إضافة قصة جديدة
  const [newStory, setNewStory] = useState({
    title: "",
    content: "",
    location: "",
    category: "ذكريات"
  });

  const filteredStories = voiceStories.filter(story => 
    selectedCategory === "الكل" || story.category === selectedCategory
  );

  const handleLike = (storyId: string) => {
    if (likedStories.includes(storyId)) {
      setLikedStories(likedStories.filter(id => id !== storyId));
    } else {
      setLikedStories([...likedStories, storyId]);
    }
  };

  const handlePlay = (storyId: string) => {
    if (playingStory === storyId) {
      setPlayingStory(null);
    } else {
      setPlayingStory(storyId);
    }
  };

  const handleSubmitStory = () => {
    // هنا يتم إرسال القصة للمراجعة
    console.log("قصة جديدة:", newStory);
    setShowAddForm(false);
    setNewStory({ title: "", content: "", location: "", category: "ذكريات" });
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "ذكريات": return "bg-blue-100 text-blue-800";
      case "تجارة وحرف": return "bg-green-100 text-green-800";
      case "مواسم دينية": return "bg-purple-100 text-purple-800";
      case "تراث شعبي": return "bg-orange-100 text-orange-800";
      case "أحياء قديمة": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-heritage-brown mb-2">
            المدينة بصوت أهلها
          </h1>
          <p className="text-muted-foreground">
            استمع لحكايات وذكريات أهل المدينة المنورة
          </p>
        </header>

        {/* أزرار الإجراءات */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            شارك قصتك
          </Button>
        </div>

        {/* نموذج إضافة قصة جديدة */}
        {showAddForm && (
          <Card className="mb-6 border-heritage-gold/20">
            <CardHeader>
              <CardTitle className="text-heritage-brown flex items-center">
                <Mic className="h-5 w-5 mr-2 text-heritage-gold" />
                شارك قصتك مع أهل المدينة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">عنوان القصة</Label>
                <input
                  id="title"
                  type="text"
                  value={newStory.title}
                  onChange={(e) => setNewStory({...newStory, title: e.target.value})}
                  className="w-full p-2 border border-heritage-gold/20 rounded-lg"
                  placeholder="مثال: ذكريات من حارة الباب"
                />
              </div>
              
              <div>
                <Label htmlFor="location">المكان</Label>
                <input
                  id="location"
                  type="text"
                  value={newStory.location}
                  onChange={(e) => setNewStory({...newStory, location: e.target.value})}
                  className="w-full p-2 border border-heritage-gold/20 rounded-lg"
                  placeholder="مثال: حارة الباب، السوق القديم"
                />
              </div>
              
              <div>
                <Label htmlFor="category">الفئة</Label>
                <select
                  id="category"
                  value={newStory.category}
                  onChange={(e) => setNewStory({...newStory, category: e.target.value})}
                  className="w-full p-2 border border-heritage-gold/20 rounded-lg"
                >
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="content">نص القصة</Label>
                <Textarea
                  id="content"
                  value={newStory.content}
                  onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                  className="w-full min-h-[100px]"
                  placeholder="اكتب قصتك أو ذكرياتك عن المدينة..."
                />
              </div>
              
              <div className="bg-heritage-beige/30 p-4 rounded-lg">
                <h4 className="font-medium text-heritage-brown mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  شروط المشاركة:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• القصة يجب أن تكون حقيقية ومن تجربة شخصية</li>
                  <li>• احترام تراث وثقافة المدينة المنورة</li>
                  <li>• تجنب المحتوى المسيء أو غير المناسب</li>
                  <li>• سيتم مراجعة القصة قبل النشر</li>
                </ul>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleSubmitStory}
                  className="bg-gradient-primary hover:opacity-90"
                  disabled={!newStory.title || !newStory.content}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  إرسال للمراجعة
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* قائمة القصص */}
        <div className="space-y-4">
          {filteredStories.map((story) => (
            <Card 
              key={story.id} 
              className="border-heritage-gold/20 hover:shadow-heritage transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Avatar>
                      <AvatarImage src={story.authorImage} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-heritage-brown text-lg">
                        {story.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                        <span>{story.author}</span>
                        <span>•</span>
                        <span>{story.createdAt}</span>
                        {story.isApproved && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Badge variant="secondary" className={getCategoryColor(story.category)}>
                      {story.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* موقع القصة */}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {story.location}
                  </div>
                  
                  {/* محتوى القصة */}
                  <p className="text-foreground leading-relaxed">
                    {story.content}
                  </p>
                  
                  {/* مشغل الصوت */}
                  {story.audioUrl && (
                    <div className="bg-heritage-beige/30 p-4 rounded-lg border border-heritage-gold/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePlay(story.id)}
                          >
                            {playingStory === story.id ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <Volume2 className="h-4 w-4 text-heritage-gold" />
                          <span className="text-sm text-heritage-brown">
                            تسجيل صوتي
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {story.duration}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* أزرار التفاعل */}
                  <div className="flex items-center justify-between pt-2 border-t border-heritage-gold/10">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleLike(story.id)}
                        className={likedStories.includes(story.id) ? "text-red-600" : "text-muted-foreground"}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${likedStories.includes(story.id) ? "fill-current" : ""}`} />
                        {story.likes + (likedStories.includes(story.id) ? 1 : 0)}
                      </Button>
                      
                      <Button size="sm" variant="ghost" className="text-muted-foreground">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {story.comments}
                      </Button>
                      
                      <Button size="sm" variant="ghost" className="text-muted-foreground">
                        <Share className="h-4 w-4 mr-1" />
                        مشاركة
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <Mic className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">لا توجد قصص في هذه الفئة حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Voices;