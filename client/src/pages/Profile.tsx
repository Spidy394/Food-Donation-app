import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Star, LogOut, Settings, HelpCircle, Bell, Moon, Sun, Shield } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { mockUser } from '@/data/mockData';
import { format } from 'date-fns';

export default function Profile() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </div>

      {/* Profile Card */}
      <Card className="border-2 border-border mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-foreground">{mockUser.name}</h2>
              <p className="text-muted-foreground">{mockUser.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3 w-3" />
                  {mockUser.points} points
                </Badge>
                <Badge variant="outline">
                  Joined {format(mockUser.joinedAt, 'MMM yyyy')}
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <div className="text-2xl font-bold text-primary">{mockUser.totalDonations}</div>
              <div className="text-sm text-muted-foreground">Donations</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/10">
              <div className="text-2xl font-bold text-secondary">{mockUser.totalClaims}</div>
              <div className="text-sm text-muted-foreground">Claims</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="border-2 border-border mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Notifications</p>
                <p className="text-sm text-muted-foreground">Get alerts for nearby food</p>
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle dark appearance</p>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Privacy</p>
                <p className="text-sm text-muted-foreground">Manage your data</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card className="border-2 border-border mb-6">
        <CardContent className="p-4">
          <button className="w-full flex items-center gap-3 py-2 text-left">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Help & Support</p>
              <p className="text-sm text-muted-foreground">FAQs, contact us, report issues</p>
            </div>
          </button>
        </CardContent>
      </Card>

      {/* Logout */}
      <Button variant="outline" className="w-full gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </Layout>
  );
}
