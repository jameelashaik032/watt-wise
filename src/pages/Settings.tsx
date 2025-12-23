import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, FileText, Info, LogOut, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      description: 'View your account details',
      onClick: () => navigate('/profile')
    },
    {
      icon: HelpCircle,
      label: 'Support & Help',
      description: 'Get help with the app',
      onClick: () => toast.info('Support coming soon!')
    },
    {
      icon: FileText,
      label: 'Terms & Conditions',
      description: 'Read our terms of service',
      onClick: () => toast.info('Terms & Conditions coming soon!')
    },
    {
      icon: Info,
      label: 'App Version',
      description: 'v1.0.0',
      onClick: () => {}
    }
  ];

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="flex items-center gap-4 px-4 py-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Menu Items */}
        <div className="card-3d divide-y divide-border/50 overflow-hidden animate-fade-in">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
              {item.label !== 'App Version' && (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <Button 
          variant="destructive" 
          className="w-full" 
          size="lg"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Made with ⚡ by Watt Scope
        </p>
      </div>
    </div>
  );
};

export default Settings;
