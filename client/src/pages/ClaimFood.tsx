import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Check, Navigation, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockListings } from '@/data/mockData';
import { cn } from '@/lib/utils';

type ClaimStatus = 'claimed' | 'en_route' | 'at_location' | 'verified';

const statusSteps: { status: ClaimStatus; label: string; description: string }[] = [
  { status: 'claimed', label: 'Claimed', description: 'Food is reserved for you' },
  { status: 'en_route', label: 'En Route', description: 'On your way to pickup' },
  { status: 'at_location', label: 'At Location', description: 'Ready for verification' },
  { status: 'verified', label: 'Verified', description: 'Pickup complete!' },
];

export default function ClaimFood() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<ClaimStatus>('claimed');

  const listing = mockListings.find((l) => l.id === id);
  const pickupCode = `FD-2024-${id?.padStart(3, '0')}`;

  if (!listing) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Claim not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </Layout>
    );
  }

  const currentStepIndex = statusSteps.findIndex((s) => s.status === status);

  const handleNextStatus = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < statusSteps.length) {
      setStatus(statusSteps[nextIndex].status);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Claim</h1>
          <p className="text-sm text-muted-foreground">Code: {pickupCode}</p>
        </div>
      </div>

      {/* Status Timeline */}
      <Card className="border-2 border-border mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {statusSteps.map((step, index) => (
              <div key={step.status} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all',
                      index <= currentStepIndex
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-background border-border text-muted-foreground'
                    )}
                  >
                    {index < currentStepIndex ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span className={cn(
                    'text-xs mt-2 text-center hidden sm:block',
                    index <= currentStepIndex ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}>
                    {step.label}
                  </span>
                </div>
                {index < statusSteps.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 w-8 sm:w-16 mx-2',
                      index < currentStepIndex ? 'bg-primary' : 'bg-border'
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">
              {statusSteps[currentStepIndex].label}
            </h2>
            <p className="text-muted-foreground">
              {statusSteps[currentStepIndex].description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Food Summary */}
      <Card className="border-2 border-border mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{listing.title}</h3>
              <p className="text-sm text-muted-foreground">{listing.quantity}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{listing.distance} km away</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action based on status */}
      {status === 'claimed' && (
        <div className="space-y-4">
          <Card className="border-2 border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Pickup Location</h3>
                  <p className="text-muted-foreground">{listing.location.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button className="w-full gap-2" size="lg" onClick={handleNextStatus}>
            <Navigation className="h-5 w-5" />
            Start Navigation
          </Button>
        </div>
      )}

      {status === 'en_route' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted h-48 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Navigation className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Navigation map would appear here</p>
              <p className="text-sm">Integrated with your Google Maps API</p>
            </div>
          </div>
          
          <Button className="w-full" size="lg" onClick={handleNextStatus}>
            I've Arrived
          </Button>
        </div>
      )}

      {status === 'at_location' && (
        <div className="space-y-4">
          <Card className="border-2 border-primary bg-primary/5">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <QrCode className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Show this to the donor</h3>
              </div>
              
              <div className="bg-background p-4 rounded-xl inline-block">
                <QRCodeSVG
                  value={JSON.stringify({
                    code: pickupCode,
                    listingId: listing.id,
                    timestamp: Date.now(),
                  })}
                  size={200}
                  level="H"
                />
              </div>
              
              <p className="mt-4 text-lg font-mono font-bold text-foreground">
                {pickupCode}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                The donor will scan this code to verify the pickup
              </p>
            </CardContent>
          </Card>
          
          {/* For demo purposes - simulate verification */}
          <Button 
            variant="outline" 
            className="w-full" 
            size="lg" 
            onClick={handleNextStatus}
          >
            (Demo) Simulate Verification
          </Button>
        </div>
      )}

      {status === 'verified' && (
        <div className="text-center py-8">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10 text-secondary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Pickup Complete! 🎉
          </h2>
          <p className="text-muted-foreground mb-6">
            Thank you for helping reduce food waste!
          </p>
          <Badge className="text-lg px-4 py-2 mb-6">
            +50 Points Earned
          </Badge>
          
          <div className="space-y-2">
            <Button className="w-full" onClick={() => navigate('/')}>
              Back to Home
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/points')}>
              View My Points
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
}
