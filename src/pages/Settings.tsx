import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Globe, 
  Bell, 
  User, 
  Shield, 
  Palette, 
  Volume2, 
  Download,
  HelpCircle,
  LogOut,
  ChevronRight
} from "lucide-react";

const Settings = () => {
  const [language, setLanguage] = useState("العربية");
  const [notifications, setNotifications] = useState({
    newStories: true,
    newTours: true,
    communityUpdates: false,
    dailyReminders: true
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [downloadQuality, setDownloadQuality] = useState("high");

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-heritage-brown mb-2">
            الإعدادات
          </h1>
          <p className="text-muted-foreground">
            خصص تجربتك في طيات المدينة
          </p>
        </header>

        <div className="space-y-6">
          {/* معلومات الحساب */}
          <Card className="border-heritage-gold/20">
            <CardHeader>
              <CardTitle className="text-heritage-brown flex items-center">
                <User className="h-5 w-5 mr-2 text-heritage-gold" />
                معلومات الحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 space-x-reverse">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="#" />
                  <AvatarFallback className="bg-heritage-gold text-heritage-brown text-lg">
                    أح
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor="username">اسم المستخدم</Label>
                  <Input 
                    id="username" 
                    defaultValue="أحمد المدني" 
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue="ahmed@example.com" 
                  className="mt-1"
                />
              </div>
              <Button variant="outline" className="w-full">
                تحديث المعلومات
              </Button>
            </CardContent>
          </Card>

          {/* إعدادات اللغة */}
          <Card className="border-heritage-gold/20">
            <CardHeader>
              <CardTitle className="text-heritage-brown flex items-center">
                <Globe className="h-5 w-5 mr-2 text-heritage-gold" />
                اللغة والمنطقة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language-select">لغة التطبيق</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="العربية">العربية</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Français">Français</SelectItem>
                    <SelectItem value="Español">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* إعدادات الإشعارات */}
          <Card className="border-heritage-gold/20">
            <CardHeader>
              <CardTitle className="text-heritage-brown flex items-center">
                <Bell className="h-5 w-5 mr-2 text-heritage-gold" />
                الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>قصص جديدة</Label>
                  <p className="text-sm text-muted-foreground">
                    إشعار عند إضافة قصص صوتية جديدة
                  </p>
                </div>
                <Switch 
                  checked={notifications.newStories}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({...prev, newStories: checked}))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>جولات جديدة</Label>
                  <p className="text-sm text-muted-foreground">
                    إشعار عند إضافة جولات AR جديدة
                  </p>
                </div>
                <Switch 
                  checked={notifications.newTours}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({...prev, newTours: checked}))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>تحديثات المجتمع</Label>
                  <p className="text-sm text-muted-foreground">
                    إشعار عند مشاركة صور أو تعليقات جديدة
                  </p>
                </div>
                <Switch 
                  checked={notifications.communityUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({...prev, communityUpdates: checked}))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>تذكيرات يومية</Label>
                  <p className="text-sm text-muted-foreground">
                    تذكير يومي لاستكشاف معالم جديدة
                  </p>
                </div>
                <Switch 
                  checked={notifications.dailyReminders}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({...prev, dailyReminders: checked}))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* إعدادات الصوت والوسائط */}
          <Card className="border-heritage-gold/20">
            <CardHeader>
              <CardTitle className="text-heritage-brown flex items-center">
                <Volume2 className="h-5 w-5 mr-2 text-heritage-gold" />
                الصوت والوسائط
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>تفعيل الأصوات</Label>
                  <p className="text-sm text-muted-foreground">
                    تشغيل أصوات التنبيهات والتفاعل
                  </p>
                </div>
                <Switch 
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>

              <div>
                <Label htmlFor="download-quality">جودة التحميل</Label>
                <Select value={downloadQuality} onValueChange={setDownloadQuality}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفضة (توفير البيانات)</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="high">عالية (أفضل جودة)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* الخصوصية والأمان */}
          <Card className="border-heritage-gold/20">
            <CardHeader>
              <CardTitle className="text-heritage-brown flex items-center">
                <Shield className="h-5 w-5 mr-2 text-heritage-gold" />
                الخصوصية والأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-between text-right"
              >
                إدارة بياناتي
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-between text-right"
              >
                إعدادات الموقع
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-between text-right"
              >
                سياسة الخصوصية
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* خيارات إضافية */}
          <Card className="border-heritage-gold/20">
            <CardHeader>
              <CardTitle className="text-heritage-brown flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-heritage-gold" />
                المساعدة والدعم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-between text-right"
              >
                الأسئلة الشائعة
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-between text-right"
              >
                تواصل معنا
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-between text-right"
              >
                تقييم التطبيق
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-between text-right"
              >
                حول التطبيق
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* تسجيل الخروج */}
          <Card className="border-red-200">
            <CardContent className="pt-6">
              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                تسجيل الخروج
              </Button>
            </CardContent>
          </Card>

          {/* معلومات الإصدار */}
          <div className="text-center text-sm text-muted-foreground py-4">
            <p>طيات المدينة v1.0.0</p>
            <p>© 2024 جميع الحقوق محفوظة</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;