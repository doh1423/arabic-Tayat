import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Play, Globe, ChevronRight, Heart, Share, Volume2 } from "lucide-react";

interface AzkarContent {
  id: string;
  title: string;
  content: string;
  type: 'morning' | 'evening' | 'sleep' | 'sunnah';
  category: string;
  audioUrl?: string;
  repetition?: number;
  source?: string;
  benefit?: string;
}

const azkarContent: AzkarContent[] = [
  {
    id: "1",
    title: "أذكار الصباح - الفاتحة",
    content: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ * الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ * الرَّحْمَٰنِ الرَّحِيمِ * مَالِكِ يَوْمِ الدِّينِ * إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ * اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ * صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    type: "morning",
    category: "أذكار الصباح",
    source: "سورة الفاتحة",
    repetition: 1,
    benefit: "أم الكتاب وفاتحة القرآن، تُقرأ في بداية كل صلاة"
  },
  {
    id: "2",
    title: "سبحان الله وبحمده",
    content: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    type: "morning",
    category: "أذكار الصباح",
    repetition: 100,
    benefit: "من قالها حُطت خطاياه وإن كانت مثل زبد البحر"
  },
  {
    id: "3",
    title: "أذكار المساء - آية الكرسي",
    content: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    type: "evening",
    category: "أذكار المساء",
    source: "سورة البقرة - آية 255",
    repetition: 1,
    benefit: "من قرأها لم يقربه شيطان حتى يصبح"
  },
  {
    id: "4",
    title: "دعاء النوم",
    content: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    type: "sleep",
    category: "أذكار النوم",
    repetition: 1,
    benefit: "دعاء مستجاب عند النوم"
  },
  {
    id: "5",
    title: "سنة الوضوء",
    content: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    type: "sunnah",
    category: "سنن الوضوء",
    repetition: 1,
    benefit: "فُتحت له أبواب الجنة الثمانية يدخل من أيها شاء"
  }
];

const categories = ["الكل", "أذكار الصباح", "أذكار المساء", "أذكار النوم", "سنن الوضوء"];
const contentTypes = ["الكل", "أذكار الصباح", "أذكار المساء", "أذكار النوم", "سنن"];

const Azkar = () => {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const filteredContent = azkarContent.filter(content => {
    const categoryMatch = selectedCategory === "الكل" || content.category === selectedCategory;
    const typeMatch = selectedType === "الكل" || 
      (selectedType === "أذكار الصباح" && content.type === "morning") ||
      (selectedType === "أذكار المساء" && content.type === "evening") ||
      (selectedType === "أذكار النوم" && content.type === "sleep") ||
      (selectedType === "سنن" && content.type === "sunnah");
    
    return categoryMatch && typeMatch;
  });

  const getTypeInArabic = (type: string) => {
    switch(type) {
      case "morning": return "أذكار الصباح";
      case "evening": return "أذكار المساء";
      case "sleep": return "أذكار النوم";
      case "sunnah": return "سنة";
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "morning": return "bg-yellow-100 text-yellow-800";
      case "evening": return "bg-blue-100 text-blue-800";
      case "sleep": return "bg-purple-100 text-purple-800";
      case "sunnah": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-heritage-brown mb-2">
            أذكار وسنن
          </h1>
          <p className="text-muted-foreground">
            أذكار الصباح والمساء والسنن النبوية الشريفة
          </p>
        </header>

        {/* فلاتر */}
        <div className="space-y-4 mb-6">
          {/* فلتر الفئة */}
          <div>
            <h3 className="text-sm font-medium text-heritage-brown mb-2">الفئة</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gradient-primary" : ""}
                >
                  <Book className="h-4 w-4 mr-1" />
                  {category}
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
                    {content.repetition && (
                      <Badge variant="outline">
                        {content.repetition}x
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* المحتوى الأساسي */}
                  <div className={`
                    text-right
                    ${content.type === "morning" || content.type === "evening" ? "text-lg leading-relaxed" : ""}
                    ${content.type === "sunnah" ? "italic" : ""}
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

                  {/* الفائدة */}
                  {content.benefit && (
                    <div className={`
                      ${expandedContent === content.id ? 'block' : 'hidden'}
                      bg-heritage-beige/30 p-4 rounded-lg border border-heritage-gold/20
                    `}>
                      <h4 className="font-medium text-heritage-brown mb-2">الفائدة:</h4>
                      <p className="text-sm text-foreground leading-relaxed">
                        {content.benefit}
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
                      {content.benefit && (
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
                          {expandedContent === content.id ? 'إخفاء الفائدة' : 'قراءة المزيد'}
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

export default Azkar;