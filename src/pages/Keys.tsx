import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Key, Trophy, BookOpen, Video, FileText, MapPin, CheckCircle, Clock } from "lucide-react";

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
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-heritage-brown mb-4">
          مفاتيح المدينة
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          أجب على الأسئلة واجمع المفاتيح للحصول على محتوى علمي عميق
        </p>
      </div>

      {/* User Progress */}
      <Card className="mb-8 border-heritage-gold/20 max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-heritage-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Key className="h-8 w-8 text-heritage-gold" />
              </div>
              <div className="text-2xl font-bold text-heritage-brown">{userProgress.keysCollected}</div>
              <div className="text-sm text-muted-foreground">من {userProgress.totalKeys} مفتاح</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-heritage-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="h-8 w-8 text-heritage-gold" />
              </div>
              <div className="text-2xl font-bold text-heritage-brown">{userProgress.totalPoints}</div>
              <div className="text-sm text-muted-foreground">نقطة</div>
            </div>
            
            <div className="text-center md:col-span-2">
              <div className="mb-2">
                <span className="text-lg font-semibold text-heritage-brown">{userProgress.level}</span>
              </div>
              <Progress value={(userProgress.keysCollected / userProgress.totalKeys) * 100} className="mb-2" />
              <div className="text-sm text-muted-foreground">
                {Math.round((userProgress.keysCollected / userProgress.totalKeys) * 100)}% مكتمل
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenges Grid */}
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {challenges.map((challenge) => (
          <Card 
            key={challenge.id} 
            className={`
              border-heritage-gold/20 hover:shadow-heritage transition-all duration-300 cursor-pointer
              ${challenge.completed ? "bg-green-50/50" : ""}
            `}
            onClick={() => setSelectedChallenge(challenge)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{challenge.landmarkName}</Badge>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`
                      ${challenge.difficulty === "سهل" ? "border-green-500" : ""}
                      ${challenge.difficulty === "متوسط" ? "border-yellow-500" : ""}
                      ${challenge.difficulty === "صعب" ? "border-red-500" : ""}
                    `}
                  >
                    {challenge.difficulty}
                  </Badge>
                  {challenge.completed && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
              <CardTitle className="text-heritage-brown text-lg">
                {challenge.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-heritage-gold" />
                  <span className="text-sm">{challenge.points} نقطة</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-gradient-primary hover:opacity-90 text-heritage-brown"
                  disabled={challenge.completed}
                >
                  {challenge.completed ? "مكتمل" : "ابدأ التحدي"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Keys;