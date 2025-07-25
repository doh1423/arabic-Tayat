import React, { useState, useEffect } from 'react';
import { X, Smartphone, Monitor, Tablet, Eye, Code, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface PrototypeOverlayProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const PrototypeOverlay: React.FC<PrototypeOverlayProps> = ({ isVisible, onToggle }) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [showGrid, setShowGrid] = useState(true);
  const [showInteractions, setShowInteractions] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      {/* Prototype Controls */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <Card className="p-3 bg-card/95 backdrop-blur-sm border-2 border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-muted-foreground">PROTOTYPE MODE</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={onToggle}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Device Controls */}
          <div className="flex gap-1 mb-3">
            <Button
              variant={deviceMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2"
              onClick={() => setDeviceMode('mobile')}
            >
              <Smartphone className="h-3 w-3 mr-1" />
              Mobile
            </Button>
            <Button
              variant={deviceMode === 'tablet' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2"
              onClick={() => setDeviceMode('tablet')}
            >
              <Tablet className="h-3 w-3 mr-1" />
              Tablet
            </Button>
            <Button
              variant={deviceMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2"
              onClick={() => setDeviceMode('desktop')}
            >
              <Monitor className="h-3 w-3 mr-1" />
              Desktop
            </Button>
          </div>

          {/* View Options */}
          <div className="flex gap-1">
            <Button
              variant={showGrid ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2"
              onClick={() => setShowGrid(!showGrid)}
            >
              <Layers className="h-3 w-3 mr-1" />
              Grid
            </Button>
            <Button
              variant={showInteractions ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2"
              onClick={() => setShowInteractions(!showInteractions)}
            >
              <Eye className="h-3 w-3 mr-1" />
              Interactions
            </Button>
          </div>
        </Card>

        {/* Device Info */}
        <Card className="p-2 bg-card/95 backdrop-blur-sm">
          <div className="text-xs text-muted-foreground text-center">
            {deviceMode === 'mobile' && '375 × 667'}
            {deviceMode === 'tablet' && '768 × 1024'}
            {deviceMode === 'desktop' && '1440 × 900'}
          </div>
        </Card>
      </div>

      {/* Grid Overlay */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-30">
          <div 
            className="h-full w-full opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        </div>
      )}

      {/* Interaction Highlights */}
      {showInteractions && (
        <style>
          {`
            .prototype-mode button,
            .prototype-mode a,
            .prototype-mode [role="button"] {
              position: relative;
              overflow: visible !important;
            }
            .prototype-mode button::after,
            .prototype-mode a::after,
            .prototype-mode [role="button"]::after {
              content: '';
              position: absolute;
              inset: -2px;
              border: 2px solid hsl(var(--primary));
              border-radius: 4px;
              pointer-events: none;
              animation: pulse 2s infinite;
            }
          `}
        </style>
      )}

      {/* Device Frame */}
      <div className={`fixed inset-0 z-20 flex items-center justify-center bg-muted/50 backdrop-blur-sm ${showInteractions ? 'prototype-mode' : ''}`}>
        <div 
          className={`
            bg-background border border-border shadow-2xl relative
            ${deviceMode === 'mobile' ? 'w-[375px] h-[667px] rounded-[2rem]' : ''}
            ${deviceMode === 'tablet' ? 'w-[768px] h-[1024px] rounded-xl' : ''}
            ${deviceMode === 'desktop' ? 'w-[1200px] h-[800px] rounded-lg' : ''}
          `}
        >
          {/* Device Chrome */}
          {deviceMode === 'mobile' && (
            <>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-muted-foreground rounded-full opacity-30"></div>
              <div className="absolute top-3 right-4 flex gap-1">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
              </div>
            </>
          )}
          
          {/* Content Area */}
          <div className={`
            h-full w-full overflow-hidden
            ${deviceMode === 'mobile' ? 'rounded-[1.5rem] pt-12 pb-8' : ''}
            ${deviceMode === 'tablet' ? 'rounded-lg p-4' : ''}
            ${deviceMode === 'desktop' ? 'rounded-lg' : ''}
          `}>
            <iframe 
              src={window.location.href}
              className="w-full h-full border-0"
              title="Prototype Preview"
            />
          </div>
        </div>
      </div>

      {/* Prototype Badges */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          <Code className="h-3 w-3 mr-1" />
          طِيَات المدينة - نموذج أولي
        </Badge>
        <Badge variant="outline" className="text-xs">
          نسخة تجريبية - للعرض فقط
        </Badge>
      </div>
    </>
  );
};