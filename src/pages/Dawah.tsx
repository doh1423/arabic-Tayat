import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Play, Globe, ChevronRight, Heart, Share, Volume2 } from "lucide-react";

interface DawahContent {
  id: string;
  title: string;
  content: string;
  type: 'verse' | 'hadith' | 'article';
  language: string;
  audioUrl?: string;
  explanation?: string;
  source?: string;
}

const dawahContent: DawahContent[] = [
  {
    id: "1",
    title: "آية الكرسي",
    content: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    type: "verse",
    language: "العربية",
    source: "سورة البقرة - آية 255",
    explanation: "آية الكرسي هي أعظم آية في القرآن الكريم، تتحدث عن عظمة الله وقدرته ووحدانيته",
    audioUrl: "#"
  },
  {
    id: "2",
    title: "Verse of the Throne",
    content: "Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
    type: "verse",
    language: "English",
    source: "Quran 2:255",
    explanation: "The Verse of the Throne is the greatest verse in the Quran, speaking about Allah's greatness, power, and oneness"
  },
  {
    id: "3",
    title: "حديث عن الرحمة",
    content: "قال رسول الله صلى الله عليه وسلم: 'الراحمون يرحمهم الرحمن، ارحموا من في الأرض يرحمكم من في السماء'",
    type: "hadith",
    language: "العربية",
    source: "رواه أبو داود والترمذي",
    explanation: "هذا الحديث يؤكد على أهمية الرحمة في الإسلام وأن من يرحم الناس يرحمه الله"
  },
  {
    id: "4",
    title: "What is Islam?",
    content: "Islam is a complete way of life that guides humanity towards peace, justice, and spiritual fulfillment. It is based on the belief in one God (Allah) and the teachings of Prophet Muhammad (peace be upon him).",
    type: "article",
    language: "English",
    explanation: "Islam means 'submission to Allah' and 'peace'. It provides guidance for all aspects of human life."
  }
];

const languages = ["الكل", "العربية", "English"];
const contentTypes = ["الكل", "آيات", "أحاديث", "مقالات"];

const Dawah = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const filteredContent = dawahContent.filter(content => {
    const languageMatch = selectedLanguage === "الكل" || content.language === selectedLanguage;
    const typeMatch = selectedType === "الكل" || 
      (selectedType === "آيات" && content.type === "verse") ||
      (selectedType === "أحاديث" && content.type === "hadith") ||
      (selectedType === "مقالات" && content.type === "article");
    
    return languageMatch && typeMatch;
  });

  const getTypeInArabic = (type: string) => {
    switch(type) {
      case "verse": return "آية";
      case "hadith": return "حديث";
      case "article": return "مقال";
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "verse": return "bg-green-100 text-green-800";
      case "hadith": return "bg-blue-100 text-blue-800";
      case "article": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-heritage-brown mb-2">
            الدعوة والتوجيه
          </h1>
          <p className="text-muted-foreground">
            تعرف على الإسلام من خلال الآيات والأحاديث والمقالات
          </p>
        </header>

        {/* فلاتر */}
        <div className="space-y-4 mb-6">
          {/* فلتر اللغة */}
          <div>
            <h3 className="text-sm font-medium text-heritage-brown mb-2">اللغة</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <Button
                  key={language}
                  variant={selectedLanguage === language ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(language)}
                  className={selectedLanguage === language ? "bg-gradient-primary" : ""}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {language}
                </Button>
              ))}
            </div>
          </div>

          {/* فلتر نوع المحتوى */}
          <div>
            <h3 className="text-sm font-medium text-heritage-brown mb-2">نوع المحتوى</h3>
            <div className="flex flex-wrap gap-2">
              {contentTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={selectedType === type ? "bg-gradient-primary" : ""}
                >
                  <Book className="h-4 w-4 mr-1" />
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* المحتوى */}
        <div className="space-y-4">
          {filteredContent.map((content) => (
            <Card 
              key={content.id} 
              className="border-heritage-gold/20 hover:shadow-heritage transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-heritage-brown flex items-center">
                    <Book className="h-5 w-5 mr-2 text-heritage-gold" />
                    {content.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Badge variant="secondary" className={getTypeColor(content.type)}>
                      {getTypeInArabic(content.type)}
                    </Badge>
                    <Badge variant="outline">
                      {content.language}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* المحتوى الأساسي */}
                  <div className={`
                    ${content.language === "العربية" ? "text-right" : "text-left"}
                    ${content.type === "verse" ? "text-lg leading-relaxed" : ""}
                    ${content.type === "hadith" ? "italic" : ""}
                    text-foreground
                  `}>
                    {content.content}
                  </div>

                  {/* المصدر */}
                  {content.source && (
                    <p className="text-sm text-muted-foreground border-r-2 border-heritage-gold pr-3">
                      {content.source}
                    </p>
                  )}

                  {/* الشرح */}
                  {content.explanation && (
                    <div className={`
                      ${expandedContent === content.id ? 'block' : 'hidden'}
                      bg-heritage-beige/30 p-4 rounded-lg border border-heritage-gold/20
                    `}>
                      <h4 className="font-medium text-heritage-brown mb-2">الشرح:</h4>
                      <p className="text-sm text-foreground leading-relaxed">
                        {content.explanation}
                      </p>
                    </div>
                  )}

                  {/* الأزرار */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {content.audioUrl && (
                        <Button size="sm" variant="outline">
                          <Volume2 className="h-4 w-4 mr-1" />
                          استماع
                        </Button>
                      )}
                      {content.explanation && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setExpandedContent(
                            expandedContent === content.id ? null : content.id
                          )}
                        >
                          <ChevronRight className={`
                            h-4 w-4 mr-1 transition-transform duration-200
                            ${expandedContent === content.id ? 'rotate-90' : ''}
                          `} />
                          {expandedContent === content.id ? 'إخفاء الشرح' : 'قراءة المزيد'}
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Button size="sm" variant="ghost" className="text-muted-foreground">
                        <Heart className="h-4 w-4 mr-1" />
                        إعجاب
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

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">لا يوجد محتوى متاح بالمرشحات المحددة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dawah;