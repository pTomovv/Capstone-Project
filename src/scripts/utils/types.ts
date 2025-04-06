export interface Property {
    id: number;
    title: string;
    price: number;
    size: number;
    bedrooms: number;
    bathrooms: number;
    location: {
        name: string;
        lat: number;
        lng: number;
    };
    type: "Apartment" | "House" | "Condo" | "Vacation Home" | "Penthouse";
    status: "For Sale" | "For Rent";
    amenities: string[];
    images: string[];
}
export interface PageComponent {
    init: () => Promise<void> | void;
    destroy: () => void;
}

export interface FilterCriteria {
    status?: "all" | "for-sale" | "for-rent";
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    minBathrooms?: number;
    searchQuery?: string;
}
export interface SortOptions {
    field: "price" | "bedrooms" | "bathrooms" | "size" | "title";
    order: "asc" | "desc";
}
