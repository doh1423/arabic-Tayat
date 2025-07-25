import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface WireframeModeProps {
  isActive: boolean;
  onToggle: () => void;
}

export const WireframeMode: React.FC<WireframeModeProps> = ({ isActive, onToggle }) => {
  if (!isActive) return null;

  return (
    <>
      {/* Wireframe Styles */}
      <style>
        {`
          .wireframe-mode * {
            background: transparent !important;
            color: #666 !important;
            border: 1px solid #ccc !important;
            box-shadow: none !important;
            text-shadow: none !important;
            background-image: none !important;
          }
          
          .wireframe-mode img {
            background: repeating-linear-gradient(
              45deg,
              #f5f5f5,
              #f5f5f5 10px,
              #e0e0e0 10px,
              #e0e0e0 20px
            ) !important;
            opacity: 0.3 !important;
          }
          
          .wireframe-mode [class*="bg-"] {
            background: #f8f8f8 !important;
          }
          
          .wireframe-mode [class*="text-"] {
            color: #666 !important;
          }
          
          .wireframe-mode button,
          .wireframe-mode .card {
            background: #fafafa !important;
            border: 2px dashed #bbb !important;
          }
          
          .wireframe-mode .navigation-item {
            position: relative;
          }
          
          .wireframe-mode .navigation-item::after {
            content: 'TAP';
            position: absolute;
            top: -8px;
            right: -8px;
            background: #ff6b6b;
            color: white;
            font-size: 8px;
            padding: 1px 4px;
            border-radius: 2px;
            font-weight: bold;
          }
          
          .wireframe-mode h1::before,
          .wireframe-mode h2::before,
          .wireframe-mode h3::before {
            content: '[H' attr(data-level, '1') '] ';
            color: #999;
            font-size: 0.7em;
          }
          
          .wireframe-mode .prototype-annotation {
            position: relative;
          }
          
          .wireframe-mode .prototype-annotation::after {
            content: attr(data-annotation);
            position: absolute;
            bottom: 100%;
            left: 0;
            background: #333;
            color: white;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 3px;
            white-space: nowrap;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.2s;
          }
          
          .wireframe-mode .prototype-annotation:hover::after {
            opacity: 1;
          }
        `}
      </style>

      {/* Wireframe Controls */}
      <div className="fixed top-20 right-4 z-50">
        <Card className="p-3 bg-white/95 backdrop-blur-sm border-2 border-dashed border-gray-400">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs font-mono text-gray-600">WIREFRAME</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onToggle}
            className="text-xs"
          >
            إخفاء الإطار
          </Button>
        </Card>
      </div>

      {/* Wireframe Legend */}
      <div className="fixed bottom-20 right-4 z-50">
        <Card className="p-3 bg-white/95 backdrop-blur-sm border-2 border-dashed border-gray-400">
          <h4 className="text-xs font-bold mb-2 text-gray-700">مفاتيح النموذج:</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-dashed border-gray-400"></div>
              <span>عنصر تفاعلي</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500 text-white text-[8px] px-1">TAP</Badge>
              <span>قابل للنقر</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 border border-gray-300"></div>
              <span>محتوى ثابت</span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};