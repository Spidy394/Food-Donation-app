import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Camera, Sparkles, MapPin, Clock, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type Step = 1 | 2 | 3 | 4;

export default function PostFood() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as 'raw' | 'cooked' | '',
    quantity: '',
    expiresIn: '',
    address: '',
  });

  // Mock AI analysis result
  const [aiSuggestion, setAiSuggestion] = useState<{
    foodType: string;
    category: 'raw' | 'cooked';
    estimatedExpiry: string;
    confidence: number;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // Simulate AI analysis
        setIsAnalyzing(true);
        setTimeout(() => {
          setAiSuggestion({
            foodType: 'Vegetable Curry with Rice',
            category: 'cooked',
            estimatedExpiry: '6 hours',
            confidence: 92,
          });
          setFormData(prev => ({
            ...prev,
            title: 'Vegetable Curry with Rice',
            category: 'cooked',
            expiresIn: '6',
          }));
          setIsAnalyzing(false);
          setStep(2);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // This would call your backend API
    console.log('Submitting:', formData);
    navigate('/');
  };

  const progress = (step / 4) * 100;

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => step > 1 ? setStep((step - 1) as Step) : navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Post Food</h1>
          <p className="text-sm text-muted-foreground">Step {step} of 4</p>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="mb-8 h-2" />

      {/* Step 1: Upload Photo */}
      {step === 1 && (
        <div className="max-w-lg mx-auto">
          <Card className="border-2 border-dashed border-border hover:border-primary transition-colors">
            <CardContent className="p-8">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Food preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="p-4 rounded-full bg-primary/10 mb-4">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Upload a photo of your food
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our AI will analyze it and suggest details
                    </p>
                    <Button className="gap-2">
                      <Upload className="h-4 w-4" />
                      Choose Photo
                    </Button>
                  </div>
                )}
              </label>
            </CardContent>
          </Card>

          {isAnalyzing && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>AI is analyzing your food...</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: AI Suggestions */}
      {step === 2 && aiSuggestion && (
        <div className="max-w-lg mx-auto space-y-6">
          <Card className="border-2 border-primary bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI Analysis</h3>
                <Badge variant="secondary" className="ml-auto">
                  {aiSuggestion.confidence}% confident
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Detected Food:</span>
                  <p className="font-medium text-foreground">{aiSuggestion.foodType}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <p className="font-medium text-foreground capitalize">{aiSuggestion.category}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Estimated Shelf Life:</span>
                  <p className="font-medium text-foreground">{aiSuggestion.estimatedExpiry}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Food Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Homemade Pasta"
              />
            </div>

            <div>
              <Label>Category</Label>
              <div className="flex gap-2 mt-2">
                {(['raw', 'cooked'] as const).map((cat) => (
                  <Button
                    key={cat}
                    type="button"
                    variant={formData.category === cat ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className="flex-1 capitalize"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            <Button className="w-full" onClick={() => setStep(3)}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Additional Details */}
      {step === 3 && (
        <div className="max-w-lg mx-auto space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell recipients more about the food..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g., 4 servings, 2 kg"
              />
            </div>

            <div>
              <Label htmlFor="expiresIn">Best before (hours)</Label>
              <Input
                id="expiresIn"
                type="number"
                value={formData.expiresIn}
                onChange={(e) => setFormData({ ...formData, expiresIn: e.target.value })}
                placeholder="e.g., 6"
              />
            </div>

            <Button className="w-full" onClick={() => setStep(4)}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Location & Confirm */}
      {step === 4 && (
        <div className="max-w-lg mx-auto space-y-6">
          <Card className="border-2 border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Pickup Location</h3>
                  <p className="text-sm text-muted-foreground">Where can recipients pick up?</p>
                </div>
              </div>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter address or use current location"
              />
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="border-2 border-border">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Preview</h3>
              <div className="flex gap-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{formData.title || 'Food Title'}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {formData.description || 'No description'}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {formData.category || 'Category'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {formData.expiresIn ? `${formData.expiresIn}h` : 'Expiry time'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full gap-2" size="lg" onClick={handleSubmit}>
            <Check className="h-5 w-5" />
            Publish Food Listing
          </Button>
        </div>
      )}
    </Layout>
  );
}
