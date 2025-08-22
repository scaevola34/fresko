import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'artist' | 'wall_owner';
  defaultTab?: 'signin' | 'signup';
}

export const AuthModal = ({ isOpen, onClose, defaultType = 'artist', defaultTab = 'signup' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [userType, setUserType] = useState<'artist' | 'wall_owner'>(defaultType);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const { signUp, signIn } = useAuth();

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    
    return {
      minLength,
      hasSpecialChar,
      hasNumber,
      hasUpperCase,
      isValid: minLength && hasSpecialChar && hasNumber && hasUpperCase
    };
  };

  const passwordValidation = validatePassword(signUpData.password);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValidation.isValid) return;
    
    setIsLoading(true);
    const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName, userType);
    
    if (!error) {
      onClose();
      setSignUpData({ fullName: '', email: '', password: '' });
    }
    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(signInData.email, signInData.password);
    
    if (!error) {
      onClose();
      setSignInData({ email: '', password: '' });
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            Rejoignez FRESKO
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'signin' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">S'inscrire</TabsTrigger>
            <TabsTrigger value="signin">Se connecter</TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="space-y-4">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={userType === 'artist' ? 'default' : 'outline'}
                onClick={() => setUserType('artist')}
                className="flex-1"
              >
                Je suis un artiste
              </Button>
              <Button
                type="button"
                variant={userType === 'wall_owner' ? 'default' : 'outline'}
                onClick={() => setUserType('wall_owner')}
                className="flex-1"
              >
                J'ai un mur
              </Button>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={signUpData.fullName}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={signUpData.password}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                
                {signUpData.password && (
                  <div className="space-y-1 text-sm">
                    <div className={passwordValidation.minLength ? 'text-green-500' : 'text-muted-foreground'}>
                      ✓ Au moins 8 caractères
                    </div>
                    <div className={passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-muted-foreground'}>
                      ✓ Au moins un caractère spécial
                    </div>
                    <div className={passwordValidation.hasNumber ? 'text-green-500' : 'text-muted-foreground'}>
                      ✓ Au moins un chiffre
                    </div>
                    <div className={passwordValidation.hasUpperCase ? 'text-green-500' : 'text-muted-foreground'}>
                      ✓ Au moins une majuscule
                    </div>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !passwordValidation.isValid}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Créer mon compte
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={signInData.email}
                  onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={signInData.password}
                    onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Se connecter
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};