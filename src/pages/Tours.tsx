import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Zap, Trophy, CheckCircle, XCircle, Star } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Tour {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  questions: Question[];
}

const tours: Tour[] = [
  {
    id: "1",
    title: "جولة المسجد النبوي التفاعلية",
    description: "استكشف تاريخ المسجد النبوي مع تقنية الواقع المعزز",
    duration: "30 دقيقة",
    difficulty: "سهل",
    questions: [
      {
        id: "1",
        question: "متى تم بناء المسجد النبوي؟",
        options: ["622 م", "630 م", "632 م", "640 م"],
        correctAnswer: 0,
        explanation: "تم بناء المسجد النبوي عام 622 م بعد هجرة النبي صلى الله عليه وسلم إلى المدينة المنورة"
      },
      {
        id: "2", 
        question: "ما هو اسم المنبر في المسجد النبوي؟",
        options: ["منبر الرسول", "المنبر الشريف", "منبر النبوة", "المنبر المقدس"],
        correctAnswer: 1,
        explanation: "يُعرف منبر المسجد النبوي باسم المنبر الشريف"
      }
    ]
  },
  {
    id: "2",
    title: "رحلة إلى جبل أحد",
    description: "تعرف على تاريخ غزوة أحد والدروس المستفادة",
    duration: "45 دقيقة", 
    difficulty: "متوسط",
    questions: [
      {
        id: "3",
        question: "في أي عام وقعت غزوة أحد؟",
        options: ["2 هـ", "3 هـ", "4 هـ", "5 هـ"],
        correctAnswer: 1,
        explanation: "وقعت غزوة أحد في السنة الثالثة من الهجرة"
      }
    ]
  }
];

const Tours = () => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const handleStartTour = (tour: Tour) => {
    setSelectedTour(tour);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompletedQuestions([]);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === selectedTour!.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setCompletedQuestions([...completedQuestions, currentQuestion]);
  };

  const handleNext = () => {
    if (currentQuestion < selectedTour!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // جولة مكتملة
      alert(`تمت الجولة! نتيجتك: ${score + (selectedAnswer === selectedTour!.questions[currentQuestion].correctAnswer ? 1 : 0)} من ${selectedTour!.questions.length}`);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-heritage-brown mb-2">
            الجولات التفاعلية AR/AI
          </h1>
          <p className="text-muted-foreground">
            تجربة غامرة لاستكشاف تاريخ المدينة المنورة
          </p>
        </header>

        {!selectedTour ? (
          // قائمة الجولات
          <div className="grid gap-4">
            {tours.map((tour) => (
              <Card key={tour.id} className="border-heritage-gold/20 hover:shadow-heritage transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-heritage-brown flex items-center">
                      <Eye className="h-5 w-5 mr-2 text-heritage-gold" />
                      {tour.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-heritage-warm">
                      {tour.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {tour.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-heritage-brown">
                      ⏱️ {tour.duration}
                    </span>
                    <span className="text-sm text-heritage-brown">
                      ❓ {tour.questions.length} أسئلة
                    </span>
                  </div>
                  <Button 
                    onClick={() => handleStartTour(tour)}
                    className="w-full bg-gradient-primary hover:opacity-90"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    ابدأ الجولة AR
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // واجهة الجولة النشطة
          <div className="space-y-6">
            {/* شريط التقدم */}
            <Card className="border-heritage-gold/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-heritage-brown">{selectedTour.title}</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedTour(null)}
                  >
                    إنهاء الجولة
                  </Button>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm">السؤال {currentQuestion + 1} من {selectedTour.questions.length}</span>
                  <div className="flex-1 bg-heritage-beige rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / selectedTour.questions.length) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-heritage-gold" />
                    <span className="text-sm font-medium">{score}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* السؤال الحالي */}
            <Card className="border-heritage-gold/20 shadow-heritage">
              <CardHeader>
                <CardTitle className="text-heritage-brown text-lg">
                  {selectedTour.questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {selectedTour.questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`
                        w-full text-right justify-start p-4 h-auto
                        ${selectedAnswer === index 
                          ? index === selectedTour.questions[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-red-500 bg-red-50 text-red-700'
                          : selectedAnswer !== null && index === selectedTour.questions[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'hover:bg-heritage-beige/50'
                        }
                      `}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center w-full">
                        <span className="flex-1">{option}</span>
                        {selectedAnswer !== null && (
                          <>
                            {index === selectedTour.questions[currentQuestion].correctAnswer && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                            {selectedAnswer === index && index !== selectedTour.questions[currentQuestion].correctAnswer && (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>

                {/* الشرح */}
                {showResult && (
                  <Card className="bg-heritage-beige/30 border-heritage-gold/30">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Star className="h-5 w-5 text-heritage-gold mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-heritage-brown">
                          {selectedTour.questions[currentQuestion].explanation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* زر التالي */}
                {showResult && (
                  <Button 
                    onClick={handleNext}
                    className="w-full mt-4 bg-gradient-primary hover:opacity-90"
                  >
                    {currentQuestion < selectedTour.questions.length - 1 ? 'السؤال التالي' : 'إنهاء الجولة'}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* منطقة الواقع المعزز */}
            <Card className="border-heritage-gold/20">
              <CardContent className="p-6">
                <div className="bg-heritage-beige rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Eye className="h-12 w-12 mx-auto mb-2 text-heritage-gold" />
                    <p className="font-medium">عرض الواقع المعزز</p>
                    <p className="text-sm">سيتم إضافة تقنية AR هنا</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;