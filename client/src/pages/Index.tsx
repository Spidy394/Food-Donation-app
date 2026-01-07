import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, MapPin, Grid, Map } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FoodCard } from '@/components/food/FoodCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppMode } from '@/hooks/useAppMode';
import { mockListings, mockUser } from '@/data/mockData';
import { cn } from '@/lib/utils';

const categories = ['All', 'Raw', 'Cooked'];

export default function Index() {
  const { mode } = useAppMode();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredListings = mockListings.filter((listing) => {
    if (selectedCategory === 'All') return true;
    return listing.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <Layout>
      {/* Hero Section for Donor Mode */}
      {mode === 'donor' && (
        <div className="mb-8 rounded-xl bg-linear-to-r from-primary/10 to-secondary/10 p-6 border border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Ready to share food? 🍲
              </h1>
              <p className="text-muted-foreground">
                You've donated {mockUser.totalDonations} meals and earned {mockUser.points} points!
              </p>
            </div>
            <Link to="/post-food">
              <Button size="lg" className="gap-2 animate-pulse-glow">
                <Plus className="h-5 w-5" />
                Post Food
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section for Recipient Mode */}
      {mode === 'recipient' && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Find food near you 📍
          </h1>
          <p className="text-muted-foreground">
            {filteredListings.length} food items available within 5km
          </p>
        </div>
      )}

      {/* Filters & View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer transition-all hover:scale-105',
                selectedCategory === category && 'bg-primary text-primary-foreground'
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <div className="flex items-center rounded-lg border border-border overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'map' ? 'secondary' : 'ghost'}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode('map')}
            >
              <Map className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Food Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <FoodCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted h-96 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Map view coming soon!</p>
            <p className="text-sm">Will integrate with your Google Maps/OpenStreetMap backend</p>
          </div>
        </div>
      )}

      {/* Floating Action Button (Mobile) */}
      {mode === 'donor' && (
        <Link
          to="/post-food"
          className="fixed bottom-6 right-6 md:hidden"
        >
          <Button size="lg" className="h-14 w-14 rounded-full shadow-lg animate-bounce-gentle">
            <Plus className="h-6 w-6" />
          </Button>
        </Link>
      )}
    </Layout>
  );
}
