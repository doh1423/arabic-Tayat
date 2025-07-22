import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, MessageCircle, Settings } from "lucide-react";

interface AudioStory {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  narrator: string;
  likes: number;
  comments: number;
  audioUrl: string;
}

const stories: AudioStory[] = [
  {
    id: "1",
    title: "غزوة بدر الكبرى",
    description: "قصة معركة بدر الأولى وانتصار المسلمين العظيم",
    duration: "25:30",
    category: "الغزوات",
    narrator: "الشيخ محمد العريفي",
    likes: 156,
    comments: 43,
    audioUrl: "#"
  },
  {
    id: "2",
    title: "هجرة النبي صلى الله عليه وسلم",
    description: "رحلة الهجرة من مكة إلى المدينة المنورة",
    duration: "18:45",
    category: "السيرة النبوية",
    narrator: "الدكتور راغب السرجاني",
    likes: 203,
    comments: 67,
    audioUrl: "#"
  },
  {
    id: "3",
    title: "قصة أصحاب الكهف",
    description: "القصة القرآنية العظيمة لأصحاب الكهف والرقيم",
    duration: "22:15",
    category: "القصص القرآني",
    narrator: "الشيخ نبيل العوضي",
    likes: 189,
    comments: 52,
    audioUrl: "#"
  },
  {
    id: "4",
    title: "تراث المدينة المنورة",
    description: "تاريخ وثقافة المدينة المنورة عبر العصور",
    duration: "30:20",
    category: "التراث",
    narrator: "الدكتور عبدالله الغامدي",
    likes: 134,
    comments: 38,
    audioUrl: "#"
  }
];

const categories = ["الكل", "الغزوات", "السيرة النبوية", "القصص القرآني", "التراث"];

const Stories = () => {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [currentStory, setCurrentStory] = useState<AudioStory | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const filteredStories = selectedCategory === "الكل" 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  const handlePlay = (story: AudioStory) => {
    setCurrentStory(story);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const changeSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-heritage-brown mb-2">
            القصص الصوتية
          </h1>
          <p className="text-muted-foreground">
            استمع إلى أجمل القصص من التراث الإسلامي
          </p>
        </header>

        {/* فلتر الفئات */}
        <div className="flex flex-wrap gap-2 mb-6">
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

        {/* مشغل الصوت الحالي */}
        {currentStory && (
          <Card className="mb-6 border-heritage-gold/20 shadow-heritage bg-gradient-warm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-heritage-brown mb-1">
                    {currentStory.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentStory.narrator}
                  </p>
                </div>
                <Volume2 className="h-6 w-6 text-heritage-gold" />
              </div>

              {/* شريط التحكم */}
              <div className="space-y-4">
                {/* شريط التقدم */}
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm text-muted-foreground">{currentTime}</span>
                  <div className="flex-1 bg-heritage-beige rounded-full h-2">
                    <div className="bg-heritage-gold h-2 rounded-full w-1/3"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">{currentStory.duration}</span>
                </div>

                {/* أزرار التحكم */}
                <div className="flex items-center justify-center space-x-4 space-x-reverse">
                  <Button size="sm" variant="outline" onClick={changeSpeed}>
                    {playbackSpeed}x
                  </Button>
                  <Button size="sm" variant="outline">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    onClick={togglePlayPause}
                    className="bg-heritage-gold hover:bg-heritage-gold/90 text-heritage-brown rounded-full w-12 h-12"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 mr-0.5" />}
                  </Button>
                  <Button size="sm" variant="outline">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* قائمة القصص */}
        <div className="space-y-4">
          {filteredStories.map((story) => (
            <Card 
              key={story.id} 
              className={`
                border-heritage-gold/20 hover:shadow-heritage transition-all duration-300 cursor-pointer
                ${currentStory?.id === story.id ? 'ring-2 ring-heritage-gold bg-heritage-gold/5' : ''}
              `}
              onClick={() => handlePlay(story)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-heritage-brown mb-2 flex items-center">
                      <Play className="h-4 w-4 mr-2 text-heritage-gold" />
                      {story.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">
                      {story.description}
                    </p>
                    <div className="flex items-center space-x-3 space-x-reverse text-sm text-muted-foreground">
                      <span>🎙️ {story.narrator}</span>
                      <span>⏱️ {story.duration}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-heritage-warm">
                    {story.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <Button size="sm" variant="ghost" className="text-muted-foreground">
                      <Heart className="h-4 w-4 mr-1" />
                      {story.likes}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-muted-foreground">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {story.comments}
                    </Button>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-gradient-primary hover:opacity-90"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(story);
                    }}
                  >
                    {currentStory?.id === story.id && isPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-1" />
                        إيقاف
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        تشغيل
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <Volume2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">لا توجد قصص في هذه الفئة حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;