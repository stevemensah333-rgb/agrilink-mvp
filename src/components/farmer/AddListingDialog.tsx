import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Check, Camera, Upload } from "lucide-react";
import CameraCapture from "@/components/CameraCapture";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { availableProduceImages, getProduceImage } from "@/lib/produceImages";
import { useImageUpload } from "@/hooks/useImageUpload";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z.string().max(500).optional(),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  unit: z.string().min(1, "Please select a unit"),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(2, "Location is required").max(200),
  selectedImage: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const categories = ["Vegetables", "Fruits", "Tubers", "Grains", "Legumes", "Spices"];
const units = ["kg", "tuber", "bunch", "crate", "bag", "piece"];

interface AddListingDialogProps {
  onListingAdded: () => void;
}

const AddListingDialog = ({ onListingAdded }: AddListingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { uploadImage, uploading, uploadedUrl, reset: resetUpload } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 1,
      unit: "kg",
      category: "Vegetables",
      location: "",
      selectedImage: "",
    },
  });

  const watchedName = form.watch("name");
  const watchedCategory = form.watch("category");
  const watchedSelectedImage = form.watch("selectedImage");
  
  const autoImage = getProduceImage(watchedName || "", watchedCategory || "Vegetables");
  const finalImage = uploadedUrl || watchedSelectedImage || autoImage;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 5MB", variant: "destructive" });
      return;
    }
    const url = await uploadImage(file);
    if (url) {
      form.setValue("selectedImage", url);
      toast({ title: "Image uploaded!", description: "Your produce photo is ready." });
    } else {
      toast({ title: "Upload failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    if (!user) return;

    setLoading(true);
    try {
      const imageToUse = values.selectedImage || getProduceImage(values.name, values.category);
      
      const { error } = await supabase.from("products").insert({
        agent_id: user.id, // Using agent_id field to store farmer's produce
        name: values.name,
        description: values.description || null,
        price: values.price,
        quantity: values.quantity,
        unit: values.unit,
        category: values.category,
        location: values.location,
        image_url: imageToUse,
        is_available: true,
      });

      if (error) throw error;

      toast({
        title: "Listing added!",
        description: "Your produce has been listed successfully.",
      });

      form.reset();
      resetUpload();
      setOpen(false);
      onListingAdded();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Listing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Farm Produce Listing</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Fresh Tomatoes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Preview and Selection */}
            <div className="space-y-3">
              <FormLabel>Product Image</FormLabel>
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-primary bg-muted flex-shrink-0">
                  <img 
                    src={finalImage} 
                    alt="Product preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 space-y-3">
                  {/* Upload buttons */}
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <CameraCapture
                      open={cameraOpen}
                      onOpenChange={setCameraOpen}
                      onCapture={async (file) => {
                        const url = await uploadImage(file);
                        if (url) {
                          form.setValue("selectedImage", url);
                          toast({ title: "Photo captured!", description: "Your produce photo is ready." });
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={uploading}
                      onClick={() => setCameraOpen(true)}
                      className="gap-1"
                    >
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                      Take Photo
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="gap-1"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="gap-1"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </Button>
                  </div>

                  {/* Preset image grid */}
                  <p className="text-sm text-muted-foreground">Or select from presets:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {availableProduceImages.map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => { form.setValue("selectedImage", item.image); resetUpload(); }}
                        className={`relative w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                          !uploadedUrl && watchedSelectedImage === item.image 
                            ? "border-primary ring-2 ring-primary/20" 
                            : "border-border hover:border-primary/50"
                        }`}
                        title={item.name}
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                        {!uploadedUrl && watchedSelectedImage === item.image && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the produce quality, freshness, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per unit (GHS)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Kumasi, Ashanti Region" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Add Listing"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddListingDialog;
