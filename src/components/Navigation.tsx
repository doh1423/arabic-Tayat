import { useLocation, useNavigate } from "react-router-dom";
import { Map, Users, Volume2, BookOpen, Settings, Mic } from "lucide-react";

const navigationItems = [
  { id: 'explore', icon: Map, label: 'استكشاف', path: '/explore' },
  { id: 'tours', icon: Users, label: 'الجولات', path: '/tours' },
  { id: 'stories', icon: Volume2, label: 'القصص', path: '/stories' },
  { id: 'azkar', icon: BookOpen, label: 'أذكار وسنن', path: '/azkar' },
  { id: 'voices', icon: Mic, label: 'المدينة بصوت أهلها', path: '/voices' },
  { id: 'settings', icon: Settings, label: 'الإعدادات', path: '/settings' },
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