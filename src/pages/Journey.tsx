import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Volume2, Bell, Navigation } from "lucide-react";

interface PathStop {
  id: string;
  name: string;
  description: string;
  audioAvailable: boolean;
  estimatedTime: string;
  image: string;
}

interface JourneyPath {
  id: string;
  title: string;
  type: string;
  description: string;
  duration: string;
  difficulty: string;
  stops: PathStop[];
  features: string[];
}

const journeyPaths: JourneyPath[] = [
  {
    id: "spiritual",
    title: "المسار الروحاني",
    type: "روحاني",
    description: "رحلة روحانية عبر أقدس الأماكن في المدينة المنورة",
    duration: "4-6 ساعات",
    difficulty: "سهل",
    stops: [
      {
        id: "prophet-mosque",
        name: "المسجد النبوي الشريف",
        description: "قلب المدينة المنورة والمكان الأقدس",
        audioAvailable: true,
        estimatedTime: "2 ساعة",
        image: "/placeholder.svg"
      },
      {
        id: "rawda",
        name: "الروضة الشريفة",
        description: "روضة من رياض الجنة",
        audioAvailable: true,
        estimatedTime: "30 دقيقة",
        image: "/placeholder.svg"
      },
      {
        id: "baqi",
        name: "البقيع الغرقد",
        description: "مقبرة الصحابة والتابعين",
        audioAvailable: true,
        estimatedTime: "45 دقيقة",
        image: "/placeholder.svg"
      }
    ],
    features: ["كبسولات صوتية", "تنبيهات الصلاة", "تتبع GPS"]
  },
  {
    id: "historical",
    title: "المسار التاريخي",
    type: "تاريخي",
    description: "استكشف تاريخ المدينة المنورة عبر العصور",
    duration: "5-7 ساعات",
    difficulty: "متوسط",
    stops: [
      {
        id: "uhud",
        name: "جبل أحد",
        description: "موقع غزوة أحد التاريخية",
        audioAvailable: true,
        estimatedTime: "1.5 ساعة",
        image: "/placeholder.svg"
      },
      {
        id: "quba",
        name: "مسجد قباء",
        description: "أول مسجد بُني في الإسلام",
        audioAvailable: true,
        estimatedTime: "1 ساعة",
        image: "/placeholder.svg"
      },
      {
        id: "saba-masajid",
        name: "السبع مساجد",
        description: "مساجد غزوة الأحزاب",
        audioAvailable: true,
        estimatedTime: "2 ساعة",
        image: "/placeholder.svg"
      }
    ],
    features: ["واقع معزز للمعارك", "خرائط تاريخية", "قصص الصحابة"]
  },
  {
    id: "cultural",
    title: "المسار الثقافي",
    type: "ثقافي",
    description: "تعرف على ثقافة وتراث أهل المدينة",
    duration: "3-4 ساعات",
    difficulty: "سهل",
    stops: [
      {
        id: "old-market",
        name: "السوق القديم",
        description: "أسواق المدينة التراثية",
        audioAvailable: true,
        estimatedTime: "1 ساعة",
        image: "/placeholder.svg"
      },
      {
        id: "heritage-village",
        name: "القرية التراثية",
        description: "حرف وتقاليد أهل المدينة",
        audioAvailable: true,
        estimatedTime: "1.5 ساعة",
        image: "/placeholder.svg"
      },
      {
        id: "dates-farms",
        name: "مزارع التمور",
        description: "تمور المدينة المشهورة",
        audioAvailable: true,
        estimatedTime: "1 ساعة",
        image: "/placeholder.svg"
      }
    ],
    features: ["تجارب تفاعلية", "ورش تراثية", "تذوق التمور"]
  },
  {
    id: "family",
    title: "المسار العائلي",
    type: "عائلي",
    description: "مسار مناسب للعائلات مع الأطفال",
    duration: "3-4 ساعات",
    difficulty: "سهل جداً",
    stops: [
      {
        id: "knowledge-oasis",
        name: "واحة المعرفة",
        description: "مركز تعليمي للأطفال",
        audioAvailable: true,
        estimatedTime: "1 ساعة",
        image: "/placeholder.svg"
      },
      {
        id: "garden-faith",
        name: "حديقة الإيمان",
        description: "حديقة تعليمية للأسرة",
        audioAvailable: true,
        estimatedTime: "1.5 ساعة",
        image: "/placeholder.svg"
      },
      {
        id: "kids-mosque",
        name: "مسجد الأطفال",
        description: "مكان تعليم الصلاة للأطفال",
        audioAvailable: true,
        estimatedTime: "30 دقيقة",
        image: "/placeholder.svg"
      }
    ],
    features: ["أنشطة للأطفال", "مناطق لعب آمنة", "تعليم تفاعلي"]
  }
];

const Journey = () => {
  const [selectedPath, setSelectedPath] = useState<JourneyPath | null>(null);

  if (selectedPath) {
    return (
      <div className="min-h-screen bg-background p-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPath(null)}
            className="mb-4"
          >
            ← العودة للمسارات
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-heritage-brown mb-2">
              {selectedPath.title}
            </h1>
            <Badge variant="secondary" className="mb-4">
              {selectedPath.type}
            </Badge>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {selectedPath.description}
            </p>
          </div>
        </div>

        {/* Path Info */}
        <Card className="mb-6 border-heritage-gold/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-5 w-5 text-heritage-gold" />
                <span>{selectedPath.duration}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-5 w-5 text-heritage-gold" />
                <span>{selectedPath.stops.length} محطات</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Navigation className="h-5 w-5 text-heritage-gold" />
                <span>{selectedPath.difficulty}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">الميزات المتاحة:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedPath.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="border-heritage-gold/30">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stops */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">محطات الرحلة:</h3>
          {selectedPath.stops.map((stop, index) => (
            <Card key={stop.id} className="border-heritage-gold/20 hover:shadow-heritage transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-heritage-gold text-heritage-brown w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-heritage-brown mb-2">{stop.name}</h4>
                    <p className="text-muted-foreground mb-3">{stop.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-heritage-gold" />
                        <span>{stop.estimatedTime}</span>
                      </div>
                      {stop.audioAvailable && (
                        <div className="flex items-center gap-1">
                          <Volume2 className="h-4 w-4 text-heritage-gold" />
                          <span>صوتي متاح</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Start Button */}
        <div className="mt-8 text-center">
          <Button 
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-heritage-brown font-bold px-8"
          >
            <Navigation className="mr-2 h-5 w-5" />
            ابدأ الرحلة الآن
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-heritage-brown mb-4">
          رحلة النور
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          اختر رحلتك المثالية في المدينة المنورة وفقاً لاهتماماتك
        </p>
      </div>

      {/* Paths Grid */}
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {journeyPaths.map((path) => (
          <Card 
            key={path.id} 
            className="border-heritage-gold/20 hover:shadow-heritage transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedPath(path)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-heritage-brown">{path.title}</CardTitle>
                <Badge variant="secondary">{path.type}</Badge>
              </div>
              <p className="text-muted-foreground text-sm">{path.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-heritage-gold" />
                    <span>{path.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-heritage-gold" />
                    <span>{path.stops.length} محطات</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {path.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-heritage-gold/30">
                      {feature}
                    </Badge>
                  ))}
                  {path.features.length > 2 && (
                    <Badge variant="outline" className="text-xs border-heritage-gold/30">
                      +{path.features.length - 2}
                    </Badge>
                  )}
                </div>

                <Button className="w-full mt-4 bg-gradient-primary hover:opacity-90 text-heritage-brown">
                  استكشف المسار
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Journey;