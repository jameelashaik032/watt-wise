import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, User, Phone, Eye, EyeOff, Building, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser, LTCategory } from '@/contexts/UserContext';
import { toast } from 'sonner';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ltCategory, setLtCategory] = useState<LTCategory>('LT-I');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = signup(username, phone, email, password, ltCategory);
      if (success) {
        toast.success('Account created successfully!');
        navigate('/home');
      } else {
        toast.error('Email already exists');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse" />
      
      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-3 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-cyan-400 animate-float">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">Create Account</h1>
          <p className="text-muted-foreground text-sm">Start tracking your electricity usage</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* LT Category Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">LT Category</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLtCategory('LT-I')}
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                    ltCategory === 'LT-I'
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/30'
                      : 'border-border bg-secondary/50 hover:border-primary/50'
                  }`}
                >
                  <Home className={`w-5 h-5 ${ltCategory === 'LT-I' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="text-left">
                    <p className={`font-medium ${ltCategory === 'LT-I' ? 'text-primary' : 'text-foreground'}`}>LT-I</p>
                    <p className="text-xs text-muted-foreground">Home</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setLtCategory('LT-II')}
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                    ltCategory === 'LT-II'
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/30'
                      : 'border-border bg-secondary/50 hover:border-primary/50'
                  }`}
                >
                  <Building className={`w-5 h-5 ${ltCategory === 'LT-II' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="text-left">
                    <p className={`font-medium ${ltCategory === 'LT-II' ? 'text-primary' : 'text-foreground'}`}>LT-II</p>
                    <p className="text-xs text-muted-foreground">Office/Shops</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            variant="electric" 
            className="w-full" 
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Sign Up
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
