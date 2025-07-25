import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { PrototypeOverlay } from "./PrototypeOverlay";
import { WireframeMode } from "./WireframeMode";
import { PrototypeBadges } from "./PrototypeBadges";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Grid3X3, Layers } from "lucide-react";

export const Layout = () => {
  const [prototypeMode, setPrototypeMode] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);

  return (
    <div className={`min-h-screen bg-gradient-heritage ${wireframeMode ? 'wireframe-mode' : ''}`}>
      {/* Prototype Toggle Buttons */}
      <div className="fixed top-4 left-4 z-40 flex gap-2">
        <Button
          variant={prototypeMode ? "default" : "outline"}
          size="sm"
          onClick={() => setPrototypeMode(!prototypeMode)}
          className="bg-background/80 backdrop-blur-sm"
        >
          <Eye className="h-3 w-3 mr-1" />
          نموذج أولي
        </Button>
        <Button
          variant={wireframeMode ? "default" : "outline"}
          size="sm"
          onClick={() => setWireframeMode(!wireframeMode)}
          className="bg-background/80 backdrop-blur-sm"
        >
          <Grid3X3 className="h-3 w-3 mr-1" />
          إطار سلكي
        </Button>
      </div>

      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <Navigation />
      
      {/* Prototype Elements */}
      {(prototypeMode || wireframeMode) && <PrototypeBadges />}
      
      {/* Prototype Overlays */}
      <PrototypeOverlay 
        isVisible={prototypeMode} 
        onToggle={() => setPrototypeMode(false)} 
      />
      <WireframeMode 
        isActive={wireframeMode} 
        onToggle={() => setWireframeMode(false)} 
      />
    </div>
  );
};