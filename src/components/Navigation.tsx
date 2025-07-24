import { useLocation, useNavigate } from "react-router-dom";
import { Map, Users, Volume2, BookOpen, Settings, Mic } from "lucide-react";

const navigationItems = [
  { id: 'journey', icon: Map, label: 'رحلة النور', path: '/journey' },
  { id: 'memory', icon: Users, label: 'مرآة الذاكرة', path: '/memory' },
  { id: 'keys', icon: BookOpen, label: 'مفاتيح المدينة', path: '/keys' },
  { id: 'secrets', icon: Volume2, label: 'تجوال الأسرار', path: '/secrets' },
  { id: 'voices', icon: Mic, label: 'صوت المدينة', path: '/voices' },
];

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-warm">
      <div className="flex justify-around items-center py-2 px-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`
                flex flex-col items-center p-2 rounded-lg transition-all duration-200
                ${active 
                  ? 'text-primary bg-heritage-gold/10 shadow-heritage' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon className={`h-5 w-5 mb-1 ${active ? 'text-heritage-gold' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};