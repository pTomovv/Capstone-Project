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
