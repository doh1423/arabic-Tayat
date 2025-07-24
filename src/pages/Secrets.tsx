import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Star, Lock, Unlock, Map, Trophy, Gift, Crown } from "lucide-react";

interface SecretLocation {
  id: string;
  name: string;
  description: string;
  category: "كنز مخفي" | "خطى الصحابة" | "ختم الجواهر";
  difficulty: "سهل" | "متوسط" | "صعب";
  coordinates: { lat: number; lng: number };
  isUnlocked: boolean;
  isCompleted: boolean;
  task: string;
  story: string;
  reward: string;
  requiredVisits?: string[];
  points: number;
}

interface CompanionJourney {
  id: string;
  companionName: string;
  title: string;
  description: string;
  locations: SecretLocation[];
  progress: number;
  isCompleted: boolean;
  totalStory: string;
  finalReward: string;
}

const hiddenTreasures: SecretLocation[] = [
  {
    id: "well-1",
    name: "بئر العين الزرقاء",
    description: "بئر قديم خفي في أزقة المدينة العتيقة",
    category: "كنز مخفي",
    difficulty: "سهل",
    coordinates: { lat: 24.4687, lng: 39.6103 },
    isUnlocked: false,
    isCompleted: false,
    task: "اقرأ دعاء الماء عند الوصول",
    story: "كان هذا البئر مصدر الماء الرئيسي لأهل هذا الحي منذ مئات السنين...",
    reward: "قصة تاريخية عن أهل الحي",
    points: 10
  },
  {
    id: "alley-1",
    name: "زقاق الطيبين",
    description: "زقاق ضيق يحمل قصص الأجداد",
    category: "كنز مخفي",
    difficulty: "متوسط",
    coordinates: { lat: 24.4701, lng: 39.6089 },
    isUnlocked: true,
    isCompleted: false,
    task: "التقط صورة للكتابة العربية القديمة على الجدار",
    story: "في هذا الزقاق كان يمر العلماء في طريقهم للمسجد النبوي...",
    reward: "مجموعة من الحكم والأقوال المأثورة",
    points: 15
  },
  {
    id: "date-garden",
    name: "البستان المنسي",
    description: "بستان نخيل قديم في ضواحي المدينة",
    category: "كنز مخفي",
    difficulty: "صعب",
    coordinates: { lat: 24.4920, lng: 39.5890 },
    isUnlocked: false,
    isCompleted: false,
    task: "اجمع 3 أنواع مختلفة من التمور واكتب أسماءها",
    story: "هذا البستان كان ملكاً لأحد الأنصار وقد بارك فيه النبي ﷺ...",
    reward: "دليل شامل عن أنواع تمور المدينة",
    points: 25
  }
];

const companionJourneys: CompanionJourney[] = [
  {
    id: "uthman-journey",
    companionName: "عثمان بن عفان",
    title: "على خطى ذي النورين",
    description: "تتبع المواقع التي عاش فيها عثمان بن عفان رضي الله عنه",
    locations: [
      {
        id: "uthman-house",
        name: "موقع بيت عثمان",
        description: "المكان الذي كان فيه بيت عثمان بن عفان",
        category: "خطى الصحابة",
        difficulty: "متوسط",
        coordinates: { lat: 24.4665, lng: 39.6095 },
        isUnlocked: true,
        isCompleted: false,
        task: "اقرأ سورة الإخلاص 3 مرات",
        story: "هنا كان بيت عثمان بن عفان، الذي اشتهر بكرمه وجوده...",
        reward: "فيديو عن حياة عثمان بن عفان",
        points: 20
      },
      {
        id: "uthman-well",
        name: "بئر رومة",
        description: "البئر الذي اشتراه عثمان وسبّله للمسلمين",
        category: "خطى الصحابة",
        difficulty: "سهل",
        coordinates: { lat: 24.4512, lng: 39.5987 },
        isUnlocked: false,
        isCompleted: false,
        task: "اشرب من ماء البئر واذكر دعاء الماء",
        story: "اشترى عثمان هذا البئر من يهودي وسبّله للمسلمين...",
        reward: "حديث شريف عن فضل سقي الماء",
        points: 15
      }
    ],
    progress: 0,
    isCompleted: false,
    totalStory: "عثمان بن عفان رضي الله عنه، ذو النورين، من أعظم الصحابة...",
    finalReward: "كتاب إلكتروني: سيرة عثمان بن عفان كاملة"
  }
];

const finalChallenges = [
  {
    id: "ultimate-challenge",
    title: "ختم الجواهر الأعظم",
    description: "التحدي النهائي الذي يجمع كل مساراتك",
    requirements: ["إكمال 3 كنوز مخفية", "إكمال رحلة صحابي واحد", "جمع 100 نقطة"],
    reward: "شهادة رقمية + ألبوم صور تاريخي + كتاب نادر",
    isUnlocked: false,
    difficulty: "أسطوري"
  }
];

const Secrets = () => {
  const [selectedLocation, setSelectedLocation] = useState<SecretLocation | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<CompanionJourney | null>(null);
  const [activeTab, setActiveTab] = useState<"treasures" | "companions" | "gems">("treasures");

  const handleCompleteTask = (locationId: string) => {
    console.log("Completing task for location:", locationId);
    // Here you would update the location's completion status
  };

  if (selectedLocation) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border-heritage-gold/20">
            <CardHeader>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedLocation(null)}
                className="self-start mb-4"
              >
                ← العودة
              </Button>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{selectedLocation.category}</Badge>
                <Badge 
                  variant="outline" 
                  className={`
                    ${selectedLocation.difficulty === "سهل" ? "border-green-500" : ""}
                    ${selectedLocation.difficulty === "متوسط" ? "border-yellow-500" : ""}
                    ${selectedLocation.difficulty === "صعب" ? "border-red-500" : ""}
                  `}
                >
                  {selectedLocation.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-heritage-brown">
                {selectedLocation.name}
              </CardTitle>
              <p className="text-muted-foreground">{selectedLocation.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {!selectedLocation.isUnlocked ? (
                <div className="text-center py-8">
                  <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">موقع مغلق</h3>
                  <p className="text-muted-foreground">يجب الوصول إلى الموقع لفتح هذا الكنز</p>
                </div>
              ) : (
                <>
                  <div className="bg-heritage-gold/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">القصة:</h4>
                    <p className="text-sm">{selectedLocation.story}</p>
                  </div>

                  <div className="border-l-4 border-heritage-gold pl-4">
                    <h4 className="font-semibold mb-2">المهمة المطلوبة:</h4>
                    <p className="text-sm">{selectedLocation.task}</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">المكافأة:</h4>
                    <p className="text-sm">{selectedLocation.reward}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="h-4 w-4 text-heritage-gold" />
                      <span className="text-sm">{selectedLocation.points} نقطة</span>
                    </div>
                  </div>

                  {!selectedLocation.isCompleted && (
                    <Button 
                      onClick={() => handleCompleteTask(selectedLocation.id)}
                      className="w-full bg-gradient-primary hover:opacity-90 text-heritage-brown"
                    >
                      إكمال المهمة
                    </Button>
                  )}
                </>
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
          تجوال الأسرار
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          اكتشف كنوز المدينة المخفية وامش على خطى الصحابة
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-muted p-1 rounded-lg">
          {[
            { id: "treasures", label: "الكنوز المخفية", icon: MapPin },
            { id: "companions", label: "خطى الصحابة", icon: Map },
            { id: "gems", label: "ختم الجواهر", icon: Crown }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id as any)}
                className={activeTab === tab.id ? "bg-heritage-gold text-heritage-brown" : ""}
              >
                <Icon className="mr-1 h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Hidden Treasures */}
      {activeTab === "treasures" && (
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {hiddenTreasures.map((treasure) => (
            <Card 
              key={treasure.id} 
              className={`
                border-heritage-gold/20 hover:shadow-heritage transition-all duration-300 cursor-pointer
                ${treasure.isCompleted ? "bg-green-50/50" : ""}
                ${!treasure.isUnlocked ? "opacity-60" : ""}
              `}
              onClick={() => setSelectedLocation(treasure)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{treasure.category}</Badge>
                  <div className="flex items-center gap-2">
                    {treasure.isUnlocked ? (
                      <Unlock className="h-4 w-4 text-green-500" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Badge 
                      variant="outline" 
                      className={`
                        ${treasure.difficulty === "سهل" ? "border-green-500" : ""}
                        ${treasure.difficulty === "متوسط" ? "border-yellow-500" : ""}
                        ${treasure.difficulty === "صعب" ? "border-red-500" : ""}
                      `}
                    >
                      {treasure.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-heritage-brown">{treasure.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{treasure.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-heritage-gold" />
                    <span className="text-sm">{treasure.points} نقطة</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-gradient-primary hover:opacity-90 text-heritage-brown"
                    disabled={!treasure.isUnlocked}
                  >
                    {treasure.isCompleted ? "مكتمل" : treasure.isUnlocked ? "استكشف" : "مغلق"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Companion Journeys */}
      {activeTab === "companions" && (
        <div className="max-w-4xl mx-auto space-y-6">
          {companionJourneys.map((journey) => (
            <Card key={journey.id} className="border-heritage-gold/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-heritage-brown">{journey.title}</CardTitle>
                  <Badge variant="secondary">{journey.companionName}</Badge>
                </div>
                <p className="text-muted-foreground">{journey.description}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>التقدم</span>
                    <span>{journey.progress}%</span>
                  </div>
                  <Progress value={journey.progress} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {journey.locations.map((location) => (
                    <div 
                      key={location.id}
                      className="p-4 border rounded-lg cursor-pointer hover:border-heritage-gold/50"
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{location.name}</h4>
                        {location.isUnlocked ? (
                          <Unlock className="h-4 w-4 text-green-500" />
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{location.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Final Challenges */}
      {activeTab === "gems" && (
        <div className="max-w-2xl mx-auto">
          {finalChallenges.map((challenge) => (
            <Card key={challenge.id} className="border-heritage-gold/20 bg-gradient-to-br from-heritage-gold/5 to-heritage-gold/10">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-heritage-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-heritage-gold" />
                </div>
                <CardTitle className="text-heritage-brown">{challenge.title}</CardTitle>
                <p className="text-muted-foreground">{challenge.description}</p>
                <Badge variant="outline" className="border-purple-500 mx-auto">
                  {challenge.difficulty}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">المتطلبات:</h4>
                  <div className="space-y-2">
                    {challenge.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground"></div>
                        <span className="text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-heritage-gold/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">المكافأة الكبرى:</h4>
                  <p className="text-sm">{challenge.reward}</p>
                </div>

                <Button 
                  disabled={!challenge.isUnlocked}
                  className="w-full bg-gradient-primary hover:opacity-90 text-heritage-brown"
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  {challenge.isUnlocked ? "ابدأ التحدي النهائي" : "غير متاح بعد"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Secrets;