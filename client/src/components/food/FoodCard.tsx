import { Link } from 'react-router-dom';
import { Clock, MapPin, Star, Utensils, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FoodListing } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface FoodCardProps {
  listing: FoodListing;
}

export function FoodCard({ listing }: FoodCardProps) {
  const timeRemaining = formatDistanceToNow(listing.expiresAt, { addSuffix: true });
  const isExpiringSoon = listing.expiresAt.getTime() - Date.now() < 6 * 60 * 60 * 1000;

  return (
    <Link to={`/food/${listing.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-border">
        <div className="relative">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
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
          <div className={cn(
            "absolute top-3 right-3",
          )}>
            <Badge 
              variant={isExpiringSoon ? 'destructive' : 'outline'}
              className="gap-1 bg-background/90 backdrop-blur-sm"
            >
              <Clock className="h-3 w-3" />
              {timeRemaining}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
            {listing.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {listing.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={listing.donor.avatar} alt={listing.donor.name} />
                <AvatarFallback>{listing.donor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {listing.donor.name}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  {listing.donor.rating}
                </div>
              </div>
            </div>

            {listing.distance && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {listing.distance} km
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
