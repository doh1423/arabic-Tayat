import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logoImage from "@/assets/logo.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo */}
        <Card className="mb-8 border-heritage-gold/20 shadow-heritage bg-card/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <img 
              src={logoImage} 
              alt="طيات المدينة" 
              className="h-24 w-auto mx-auto mb-4 rounded-lg shadow-warm"
            />
            <h1 className="text-3xl font-bold text-heritage-brown mb-2">
              طيات المدينة
            </h1>
            <div className="h-1 w-16 bg-gradient-primary mx-auto rounded-full"></div>
          </CardContent>
        </Card>

        {/* Welcome Text */}
        <div className="mb-12 max-w-md">
          <h2 className="text-xl text-foreground mb-4 leading-relaxed">
            مرحبًا بك في طيات المدينة
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            حيث تُحاكي التاريخ والثقافة
          </p>
        </div>

        {/* Start Button */}
        <Button 
          onClick={() => navigate('/explore')}
          size="lg"
          className="
            bg-gradient-primary hover:opacity-90 
            text-heritage-brown font-bold text-lg px-12 py-4 
            rounded-full shadow-heritage 
            transform hover:scale-105 transition-all duration-300
            border border-heritage-gold/30
          "
        >
          ابدأ رحلتك
        </Button>

        {/* Decorative Elements */}
        <div className="mt-12 flex space-x-4 opacity-50">
          <div className="w-2 h-2 rounded-full bg-heritage-gold animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-heritage-gold animate-pulse delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-heritage-gold animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;