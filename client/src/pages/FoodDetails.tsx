import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Star, Utensils, Leaf, Share2, Flag, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockListings } from '@/data/mockData';
import { formatDistanceToNow, format } from 'date-fns';

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);

  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Food not found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const timeRemaining = formatDistanceToNow(listing.expiresAt, { addSuffix: true });
  const isExpiringSoon = listing.expiresAt.getTime() - Date.now() < 6 * 60 * 60 * 1000;

  const handleClaim = () => {
    setIsClaimDialogOpen(false);
    navigate(`/claim/${listing.id}`);
  };

  return (
    <Layout>
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-border">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-80 lg:h-96 object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge
                variant={listing.category === 'cooked' ? 'default' : 'secondary'}
                className="gap-1"
              >
                {listing.category === 'cooked' ? (
                  <Utensils className="h-3 w-3" />
                ) : (
                  <Leaf className="h-3 w-3" />
                )}
                {listing.category}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Flag className="h-4 w-4" />
              Report
            </Button>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {listing.title}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <Badge
                variant={isExpiringSoon ? 'destructive' : 'outline'}
                className="gap-1"
              >
                <Clock className="h-3 w-3" />
                Expires {timeRemaining}
              </Badge>
              <span className="text-muted-foreground">
                Quantity: {listing.quantity}
              </span>
            </div>
          </div>

          <p className="text-foreground leading-relaxed">
            {listing.description}
          </p>

          {/* Location Card */}
          <Card className="border-2 border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Pickup Location</h3>
                  <p className="text-muted-foreground">{listing.location.address}</p>
                  <p className="text-sm text-primary mt-1">
                    {listing.distance} km away
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donor Card */}
          <Card className="border-2 border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={listing.donor.avatar} alt={listing.donor.name} />
                    <AvatarFallback>{listing.donor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{listing.donor.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        {listing.donor.rating}
                      </div>
                      <span>•</span>
                      <span>{listing.donor.totalDonations} donations</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posted Time */}
          <p className="text-sm text-muted-foreground">
            Posted {formatDistanceToNow(listing.createdAt, { addSuffix: true })}
          </p>

          {/* Claim Button */}
          <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full">
                Claim This Food
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Claim</DialogTitle>
                <DialogDescription>
                  You're about to claim "{listing.title}". Please make sure you can pick it up before it expires.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span>Expires: {format(listing.expiresAt, 'PPp')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{listing.location.address}</span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsClaimDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleClaim}>
                  Confirm Claim
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}
