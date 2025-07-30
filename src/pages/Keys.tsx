import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Key, Trophy, BookOpen, Video, FileText, MapPin, CheckCircle, Clock, Star, Award, ChevronRight, Lock } from "lucide-react";

interface Challenge {
  id: string;
  landmarkId: string;
  landmarkName: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  reward: Reward;
  difficulty: "سهل" | "متوسط" | "صعب";
  completed: boolean;
  points: number;
}

interface Reward {
  type: "video" | "article" | "map" | "book";
  title: string;
  description: string;
  content: string;
}

interface UserProgress {
  totalKeys: number;
  keysCollected: number;
  totalPoints: number;
  level: string;
  achievements: string[];
}

const challenges: Challenge[] = [
  {
    id: "1",
    landmarkId: "prophet-mosque",
    landmarkName: "المسجد النبوي الشريف",
    question: "ما هو اسم المكان الذي دُفن فيه النبي محمد ﷺ؟",
    options: ["الروضة الشريفة", "الحجرة النبوية", "المنبر الشريف", "المحراب"],
    correctAnswer: 1,
    explanation: "دُفن النبي محمد ﷺ في الحجرة النبوية، والتي كانت بيت عائشة رضي الله عنها.",
    reward: {
      type: "video",
      title: "فيديو: تاريخ المسجد النبوي",
      description: "شرح مفصل عن تاريخ وتطوير المسجد النبوي الشريف",
      content: "محتوى الفيديو التعليمي..."
    },
    difficulty: "سهل",
    completed: true,
    points: 10
  },
  {
    id: "2",
    landmarkId: "uhud",
    landmarkName: "جبل أحد",
    question: "في أي عام هجري وقعت غزوة أحد؟",
    options: ["السنة الثانية", "السنة الثالثة", "السنة الرابعة", "السنة الخامسة"],
    correctAnswer: 1,
    explanation: "وقعت غزوة أحد في السنة الثالثة للهجرة، وكانت من أهم الغزوات في التاريخ الإسلامي.",
    reward: {
      type: "map",
      title: "خريطة: مواقع غزوة أحد",
      description: "خريطة تفصيلية توضح مواقع الأحداث في غزوة أحد",
      content: "محتوى الخريطة التوضيحية..."
    },
    difficulty: "متوسط",
    completed: false,
    points: 15
  },
  {
    id: "3",
    landmarkId: "quba",
    landmarkName: "مسجد قباء",
    question: "ما هو فضل الصلاة في مسجد قباء كما ورد في الحديث؟",
    options: ["كأجر عمرة", "كأجر حجة", "كأجر الجهاد", "كأجر صوم سنة"],
    correctAnswer: 0,
    explanation: "قال النبي ﷺ: 'من تطهر في بيته، ثم أتى مسجد قباء فصلى فيه صلاة، كان له كأجر عمرة'.",
    reward: {
      type: "article",
      title: "مقال: فضائل مسجد قباء",
      description: "مقال شرعي مفصل عن فضائل وأحكام مسجد قباء",
      content: "محتوى المقال الشرعي..."
    },
    difficulty: "متوسط",
    completed: false,
    points: 15
  },
  {
    id: "4",
    landmarkId: "baqi",
    landmarkName: "البقيع الغرقد",
    question: "من هم أشهر الصحابة المدفونين في البقيع؟",
    options: [
      "عثمان بن عفان وعبدالرحمن بن عوف",
      "علي بن أبي طالب وطلحة بن عبيدالله",
      "أبو بكر وعمر بن الخطاب",
      "سعد بن أبي وقاص والزبير بن العوام"
    ],
    correctAnswer: 0,
    explanation: "من أشهر الصحابة المدفونين في البقيع: عثمان بن عفان، وعبدالرحمن بن عوف، وطلحة بن عبيدالله، والزبير بن العوام، وسعد بن أبي وقاص.",
    reward: {
      type: "book",
      title: "كتاب: سير الصحابة المدفونين في البقيع",
      description: "كتاب إلكتروني عن حياة وسير الصحابة الذين دُفنوا في البقيع",
      content: "محتوى الكتاب الإلكتروني..."
    },
    difficulty: "صعب",
    completed: false,
    points: 20
  }
];

const userProgress: UserProgress = {
  totalKeys: 15,
  keysCollected: 3,
  totalPoints: 65,
  level: "باحث عن المعرفة",
  achievements: ["أول مفتاح", "جامع النقاط", "محب التاريخ"]
};

const Keys = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const handleAnswerSubmit = () => {
    if (currentAnswer === null) return;
    setShowResult(true);
  };

  const handleNextChallenge = () => {
    setSelectedChallenge(null);
    setCurrentAnswer(null);
    setShowResult(false);
    setShowReward(false);
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-8 w-8 text-heritage-gold" />;
      case "article": return <FileText className="h-8 w-8 text-heritage-gold" />;
      case "map": return <MapPin className="h-8 w-8 text-heritage-gold" />;
      case "book": return <BookOpen className="h-8 w-8 text-heritage-gold" />;
      default: return <Key className="h-8 w-8 text-heritage-gold" />;
    }
  };

  if (showReward && selectedChallenge) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border-heritage-gold/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-heritage-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {getRewardIcon(selectedChallenge.reward.type)}
              </div>
              <CardTitle className="text-heritage-brown">
                تهانينا! حصلت على مفتاح جديد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{selectedChallenge.reward.title}</h3>
                <p className="text-muted-foreground">{selectedChallenge.reward.description}</p>
              </div>

              <div className="bg-heritage-gold/10 p-4 rounded-lg">
                <p className="text-sm">{selectedChallenge.reward.content}</p>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-primary hover:opacity-90 text-heritage-brown"
                  onClick={() => setShowReward(false)}
                >
                  عرض المحتوى
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleNextChallenge}
                >
                  التحدي التالي
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedChallenge) {
    const isCorrect = showResult && currentAnswer === selectedChallenge.correctAnswer;
    
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border-heritage-gold/20">
            <CardHeader>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedChallenge(null)}
                className="self-start mb-4"
              >
                ← العودة للتحديات
              </Button>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{selectedChallenge.landmarkName}</Badge>
                <Badge 
                  variant="outline" 
                  className={`
                    ${selectedChallenge.difficulty === "سهل" ? "border-green-500" : ""}
                    ${selectedChallenge.difficulty === "متوسط" ? "border-yellow-500" : ""}
                    ${selectedChallenge.difficulty === "صعب" ? "border-red-500" : ""}
                  `}
                >
                  {selectedChallenge.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">{selectedChallenge.question}</h3>
                
                <div className="space-y-3">
                  {selectedChallenge.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showResult && setCurrentAnswer(index)}
                      disabled={showResult}
                      className={`
                        w-full p-4 text-right rounded-lg border transition-colors
                        ${!showResult && currentAnswer === index ? "border-heritage-gold bg-heritage-gold/10" : "border-border"}
                        ${showResult && index === selectedChallenge.correctAnswer ? "border-green-500 bg-green-50" : ""}
                        ${showResult && currentAnswer === index && index !== selectedChallenge.correctAnswer ? "border-red-500 bg-red-50" : ""}
                        ${!showResult ? "hover:border-heritage-gold/50" : ""}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResult && index === selectedChallenge.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {showResult && (
                <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-50" : "bg-blue-50"}`}>
                  <h4 className="font-semibold mb-2">
                    {isCorrect ? "إجابة صحيحة! 🎉" : "تعرّف على الإجابة الصحيحة"}
                  </h4>
                  <p className="text-sm">{selectedChallenge.explanation}</p>
                </div>
              )}

              {!showResult ? (
                <Button 
                  onClick={handleAnswerSubmit}
                  disabled={currentAnswer === null}
                  className="w-full bg-gradient-primary hover:opacity-90 text-heritage-brown"
                >
                  تأكيد الإجابة
                </Button>
              ) : (
                <Button 
                  onClick={() => setShowReward(true)}
                  className="w-full bg-gradient-primary hover:opacity-90 text-heritage-brown"
                >
                  <Key className="mr-2 h-4 w-4" />
                  احصل على المفتاح (+{selectedChallenge.points} نقطة)
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 md:p-6">
      {/* Header Section */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-3xl opacity-20"></div>
          <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-heritage-gold/20">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Key className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              مفاتيح المدينة المنورة
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              استكشف تاريخ المدينة المنورة من خلال التحديات التفاعلية واحصل على مفاتيح المعرفة
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced User Progress */}
      <Card className="mb-10 border-heritage-gold/30 max-w-5xl mx-auto shadow-xl bg-card/95 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Section */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-105 transition-transform">
                  <Key className="h-10 w-10 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {userProgress.keysCollected}
                </div>
                <div className="text-sm text-muted-foreground">من {userProgress.totalKeys} مفتاح</div>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-105 transition-transform">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                  {userProgress.totalPoints}
                </div>
                <div className="text-sm text-muted-foreground">نقطة</div>
              </div>
              
              <div className="text-center group col-span-2 md:col-span-1">
                <div className="w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-105 transition-transform">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                  {userProgress.achievements.length}
                </div>
                <div className="text-sm text-muted-foreground">إنجاز</div>
              </div>
            </div>
            
            {/* Progress Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-heritage-brown">{userProgress.level}</span>
                <Star className="h-5 w-5 text-heritage-gold" />
              </div>
              <div className="space-y-2">
                <Progress 
                  value={(userProgress.keysCollected / userProgress.totalKeys) * 100} 
                  className="h-3 bg-heritage-gold/20" 
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{Math.round((userProgress.keysCollected / userProgress.totalKeys) * 100)}% مكتمل</span>
                  <span>المستوى التالي: {userProgress.totalKeys - userProgress.keysCollected} مفتاح</span>
                </div>
              </div>
              
              {/* Achievements Preview */}
              <div className="mt-4">
                <div className="text-sm font-medium mb-2">الإنجازات الأخيرة:</div>
                <div className="flex flex-wrap gap-1">
                  {userProgress.achievements.slice(0, 3).map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Challenges Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-heritage-brown">التحديات المتاحة</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{challenges.filter(c => !c.completed).length} تحدي متبقي</span>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge, index) => (
            <Card 
              key={challenge.id} 
              className={`
                group border-heritage-gold/30 hover:border-heritage-gold/50 transition-all duration-500 cursor-pointer
                bg-card/95 backdrop-blur-sm hover:shadow-2xl hover:shadow-heritage-gold/20
                ${challenge.completed ? "bg-gradient-to-br from-green-50/80 to-emerald-50/80 border-green-200" : "hover:-translate-y-2"}
              `}
              onClick={() => setSelectedChallenge(challenge)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white
                      ${challenge.completed ? "bg-green-500" : "bg-gradient-primary"}
                    `}>
                      {index + 1}
                    </div>
                    <Badge variant="secondary" className="bg-heritage-gold/10 text-heritage-brown border-heritage-gold/30">
                      {challenge.landmarkName}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs
                        ${challenge.difficulty === "سهل" ? "border-green-500 text-green-600 bg-green-50" : ""}
                        ${challenge.difficulty === "متوسط" ? "border-yellow-500 text-yellow-600 bg-yellow-50" : ""}
                        ${challenge.difficulty === "صعب" ? "border-red-500 text-red-600 bg-red-50" : ""}
                      `}
                    >
                      {challenge.difficulty}
                    </Badge>
                    {challenge.completed && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
                <CardTitle className="text-heritage-brown text-lg leading-tight group-hover:text-heritage-gold transition-colors">
                  {challenge.question}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Key className="h-4 w-4 text-heritage-gold" />
                      <span className="text-sm font-medium">{challenge.points}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getRewardIcon(challenge.reward.type)}
                      <span className="text-xs text-muted-foreground capitalize">{challenge.reward.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {challenge.completed ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        مكتمل
                      </Badge>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-gradient-primary hover:opacity-90 text-white shadow-md group-hover:shadow-lg transition-all"
                      >
                        ابدأ
                        <ChevronRight className="h-4 w-4 mr-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Progress indicator for completed challenges */}
                {challenge.completed && (
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <div className="flex items-center justify-between text-xs text-green-600">
                      <span>تم الإكمال</span>
                      <span>{challenge.points} نقطة مكتسبة</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Empty state for completed challenges */}
      {challenges.every(c => c.completed) && (
        <div className="text-center mt-12 p-8">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-heritage-brown mb-2">تهانينا!</h3>
          <p className="text-muted-foreground">لقد أكملت جميع التحديات المتاحة</p>
        </div>
      )}
    </div>
  );
};

export default Keys;