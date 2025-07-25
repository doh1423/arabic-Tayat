import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Smartphone, Monitor, Tablet, Users, Clock, Star } from 'lucide-react';

export const PrototypeBadges = () => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <Card className="p-3 bg-primary/5 backdrop-blur-sm border border-primary/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-primary">طِيَات المدينة</span>
          </div>
          
          <div className="flex gap-1">
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
              <Smartphone className="h-3 w-3 mr-1" />
              نموذج أولي
            </Badge>
            <Badge variant="outline" className="text-xs">
              نسخة تجريبية
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>للجوال</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>تفاعلي</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>v1.0</span>
          </div>
        </div>
      </Card>
    </div>
  );
};