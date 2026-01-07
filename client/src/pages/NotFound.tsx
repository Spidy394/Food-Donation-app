import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppMode } from '@/hooks/useAppMode';
import { mockListings, mockClaims } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

const statusConfig = {
  available: { label: 'Available', icon: Clock, variant: 'outline' as const },
  claimed: { label: 'Claimed', icon: ShoppingBag, variant: 'secondary' as const },
  completed: { label: 'Completed', icon: CheckCircle, variant: 'default' as const },
  expired: { label: 'Expired', icon: XCircle, variant: 'destructive' as const },
  pending: { label: 'Pending', icon: Clock, variant: 'outline' as const },
};

export default function MyListings() {
  const { mode } = useAppMode();
  const [activeTab, setActiveTab] = useState('active');

  // Mock data - would come from your backend
  const myDonations = mockListings.slice(0, 3);
  const myClaims = mockClaims;

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {mode === 'donor' ? 'My Donations' : 'My Claims'}
        </h1>
        <p className="text-muted-foreground">
          {mode === 'donor' 
            ? 'Manage your food listings and see their status' 
            : 'Track your claimed food and pickup status'}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {mode === 'donor' ? (
            // Donor's active listings
            myDonations
              .filter(d => d.status === 'available' || d.status === 'claimed')
              .map((donation) => {
                const config = statusConfig[donation.status];
                const StatusIcon = config.icon;
                
                return (
                  <Card key={donation.id} className="border-2 border-border">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={donation.imageUrl}
                          alt={donation.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-foreground">{donation.title}</h3>
                            <Badge variant={config.variant} className="gap-1">
                              <StatusIcon className="h-3 w-3" />
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {donation.quantity}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              Expires {formatDistanceToNow(donation.expiresAt, { addSuffix: true })}
                            </span>
                          </div>
                          
                          {donation.status === 'claimed' && (
                            <p className="text-sm text-primary mt-2">
                              Someone is coming to pick this up!
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" className="flex-1">
                          Unlist
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
          ) : (
            // Recipient's active claims
            myClaims
              .filter(c => c.status === 'pending')
              .map((claim) => (
                <Link key={claim.id} to={`/claim/${claim.listingId}`}>
                  <Card className="border-2 border-border hover:border-primary transition-colors">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={claim.listing.imageUrl}
                          alt={claim.listing.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-foreground">{claim.listing.title}</h3>
                            <Badge variant="outline" className="gap-1">
                              <Clock className="h-3 w-3" />
                              Pending Pickup
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            From: {claim.listing.donor.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Code: <span className="font-mono font-bold">{claim.pickupCode}</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
          )}

          {((mode === 'donor' && myDonations.filter(d => d.status === 'available' || d.status === 'claimed').length === 0) ||
            (mode === 'recipient' && myClaims.filter(c => c.status === 'pending').length === 0)) && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold text-foreground mb-2">No active items</h3>
              <p className="text-muted-foreground mb-4">
                {mode === 'donor' 
                  ? "You don't have any active food listings" 
                  : "You haven't claimed any food yet"}
              </p>
              <Link to={mode === 'donor' ? '/post-food' : '/'}>
                <Button>
                  {mode === 'donor' ? 'Post Food' : 'Browse Food'}
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="text-center py-12">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-semibold text-foreground mb-2">No history yet</h3>
            <p className="text-muted-foreground">
              Your completed {mode === 'donor' ? 'donations' : 'pickups'} will appear here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
