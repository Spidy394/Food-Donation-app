import { Trophy, Star, Gift, TrendingUp, Award, Zap } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockUser } from '@/data/mockData';
import { cn } from '@/lib/utils';

const badges = [
  { id: 1, name: 'Early Adopter', icon: Star, earned: true, description: 'Joined during beta' },
  { id: 2, name: 'Super Donor', icon: Trophy, earned: true, description: 'Donated 25+ meals' },
  { id: 3, name: 'Community Hero', icon: Award, earned: true, description: 'Helped 50+ people' },
  { id: 4, name: 'Zero Waste Champion', icon: Zap, earned: false, description: 'Save 100 meals from waste' },
  { id: 5, name: 'Top Contributor', icon: TrendingUp, earned: false, description: 'Reach top 10 leaderboard' },
];

const pointsHistory = [
  { id: 1, description: 'Donated: Fresh Vegetable Curry', points: 50, date: 'Today' },
  { id: 2, description: 'Claimed & Picked up: Organic Fruits', points: 20, date: 'Yesterday' },
  { id: 3, description: 'Donated: Homemade Pasta', points: 50, date: '2 days ago' },
  { id: 4, description: 'First donation bonus', points: 100, date: '1 week ago' },
  { id: 5, description: 'Signup bonus', points: 50, date: '2 weeks ago' },
];

const nextMilestone = 1500;

export default function Points() {
  const progress = (mockUser.points / nextMilestone) * 100;

  return (
    <Layout>
      {/* Hero Card */}
      <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/10 mb-6">
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
            <Trophy className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {mockUser.points.toLocaleString()}
          </h1>
          <p className="text-muted-foreground mb-4">Total Points</p>
          
          <div className="max-w-xs mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress to next reward</span>
              <span className="font-medium text-foreground">{mockUser.points}/{nextMilestone}</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="border-2 border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mockUser.totalDonations}</div>
            <div className="text-sm text-muted-foreground">Meals Donated</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{mockUser.totalClaims}</div>
            <div className="text-sm text-muted-foreground">Meals Claimed</div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card className="border-2 border-border mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {badges.map((badge) => {
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={cn(
                    'flex flex-col items-center p-4 rounded-xl border-2 transition-all',
                    badge.earned
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-muted/50 opacity-50'
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center mb-2',
                      badge.earned
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <BadgeIcon className="h-6 w-6" />
                  </div>
                  <span className={cn(
                    'text-sm font-medium text-center',
                    badge.earned ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {badge.name}
                  </span>
                  <span className="text-xs text-muted-foreground text-center mt-1">
                    {badge.description}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Points History */}
      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Points History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pointsHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{item.description}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <Badge variant="secondary" className="text-secondary-foreground">
                  +{item.points}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon: Rewards */}
      <Card className="border-2 border-dashed border-border mt-6">
        <CardContent className="p-6 text-center">
          <Gift className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="font-semibold text-foreground mb-2">Rewards Coming Soon!</h3>
          <p className="text-muted-foreground">
            Redeem your points for discounts and goodies from our partners.
          </p>
        </CardContent>
      </Card>
    </Layout>
  );
}
