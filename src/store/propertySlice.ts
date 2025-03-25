
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "rent" | "sale";
  propertyType: "apartment" | "house" | "condo" | "villa";
  features: string[];
  images: string[];
  contact: {
    name: string;
    phone: string;
    email: string;
  };
}

interface PropertyState {
  properties: Property[];
  filteredProperties: Property[];
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;
  filters: {
    priceMin: number;
    priceMax: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    propertyType: string | null;
    type: "rent" | "sale" | null;
    location: string | null;
  };
}

// Mock data
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Luxurious Modern Apartment",
    description: "Beautiful city-center apartment with amazing views, modern appliances, and spacious rooms.",
    price: 350000,
    location: "Downtown, New York",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "sale",
    propertyType: "apartment",
    features: ["Balcony", "Parking", "Gym", "Pool"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2084&auto=format&fit=crop"
    ],
    contact: {
      name: "John Smith",
      phone: "123-456-7890",
      email: "john@example.com"
    }
  },
  {
    id: "2",
    title: "Spacious Family Home",
    description: "Perfect family home with large backyard, open kitchen, and close to excellent schools.",
    price: 2500,
    location: "Suburban Heights, Boston",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    type: "rent",
    propertyType: "house",
    features: ["Garden", "Garage", "Fireplace", "Central AC"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
    ],
    contact: {
      name: "Emily Johnson",
      phone: "234-567-8901",
      email: "emily@example.com"
    }
  },
  {
    id: "3",
    title: "Elegant City Condo",
    description: "Stylish condo in the heart of the city with high ceilings and premium finishes.",
    price: 425000,
    location: "Midtown, Chicago",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    type: "sale",
    propertyType: "condo",
    features: ["Doorman", "Elevator", "Fitness Center", "Rooftop Terrace"],
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db3d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    ],
    contact: {
      name: "David Wilson",
      phone: "345-678-9012",
      email: "david@example.com"
    }
  },
  {
    id: "4",
    title: "Waterfront Luxury Villa",
    description: "Stunning waterfront property with private dock, infinity pool, and panoramic views.",
    price: 3800,
    location: "Beachside, Miami",
    bedrooms: 5,
    bathrooms: 4,
    area: 3800,
    type: "rent",
    propertyType: "villa",
    features: ["Pool", "Private Beach", "Home Theater", "Wine Cellar"],
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600047508788-26bb381500e1?q=80&w=2070&auto=format&fit=crop"
    ],
    contact: {
      name: "Sophia Garcia",
      phone: "456-789-0123",
      email: "sophia@example.com"
    }
  },
  {
    id: "5",
    title: "Modern Townhouse",
    description: "Three-story townhouse with modern design, energy-efficient features, and community amenities.",
    price: 295000,
    location: "Arts District, Los Angeles",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1800,
    type: "sale",
    propertyType: "house",
    features: ["Rooftop Deck", "Smart Home", "Community Pool", "Dog Park"],
    images: [
      "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=1970&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574118140238-fd800a4dc0b2?q=80&w=1925&auto=format&fit=crop"
    ],
    contact: {
      name: "Michael Brown",
      phone: "567-890-1234",
      email: "michael@example.com"
    }
  },
  {
    id: "6",
    title: "Charming Historic Apartment",
    description: "Beautiful apartment in a historic building with original features and modern updates.",
    price: 1950,
    location: "Old Town, San Francisco",
    bedrooms: 1,
    bathrooms: 1,
    area: 950,
    type: "rent",
    propertyType: "apartment",
    features: ["High Ceilings", "Hardwood Floors", "Bay Windows", "Walk-up"],
    images: [
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop"
    ],
    contact: {
      name: "Olivia Martinez",
      phone: "678-901-2345",
      email: "olivia@example.com"
    }
  }
];

// Async thunks (simulate API calls)
export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async () => {
    // Simulate API call
    return new Promise<Property[]>((resolve) => {
      setTimeout(() => {
        resolve(mockProperties);
      }, 500);
    });
  }
);

export const fetchPropertyById = createAsyncThunk(
  "properties/fetchPropertyById",
  async (id: string) => {
    // Simulate API call
    return new Promise<Property>((resolve, reject) => {
      setTimeout(() => {
        const property = mockProperties.find(p => p.id === id);
        if (property) {
          resolve(property);
        } else {
          reject(new Error("Property not found"));
        }
      }, 300);
    });
  }
);

const initialState: PropertyState = {
  properties: [],
  filteredProperties: [],
  selectedProperty: null,
  loading: false,
  error: null,
  filters: {
    priceMin: 0,
    priceMax: null,
    bedrooms: null,
    bathrooms: null,
    propertyType: null,
    type: null,
    location: null,
  },
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<PropertyState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredProperties = filterProperties(state.properties, state.filters);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredProperties = state.properties;
    },
    setSelectedProperty: (state, action: PayloadAction<Property>) => {
      state.selectedProperty = action.payload;
    },
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        state.filteredProperties = filterProperties(action.payload, state.filters);
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch properties";
      })
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch property";
      });
  },
});

// Filter helper function
const filterProperties = (
  properties: Property[],
  filters: PropertyState["filters"]
): Property[] => {
  return properties.filter((property) => {
    // Price filter
    if (
      (filters.priceMin && property.price < filters.priceMin) ||
      (filters.priceMax && property.price > filters.priceMax)
    ) {
      return false;
    }

    // Bedrooms filter
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) {
      return false;
    }

    // Bathrooms filter
    if (filters.bathrooms && property.bathrooms < filters.bathrooms) {
      return false;
    }

    // Property type filter
    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false;
    }

    // Sale/Rent type filter
    if (filters.type && property.type !== filters.type) {
      return false;
    }

    // Location filter (simple includes check)
    if (
      filters.location &&
      !property.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
};

export const { setFilters, clearFilters, setSelectedProperty, clearSelectedProperty } = propertySlice.actions;

export default propertySlice.reducer;
