import { Property } from "../types";

const locations = [
    { name: "Downtown", lat: 40.7128, lng: -74.006 },
    { name: "Downtown", lat: 20.7128, lng: -94.006 },
    { name: "Downtown", lat: 60.7128, lng: -54.006 },
    { name: "Suburbs", lat: 20.758, lng: -73.9855 },
    { name: "Suburbs", lat: 40.758, lng: -33.9855 },
    { name: "Suburbs", lat: 60.758, lng: -83.9855 },
    { name: "Beachfront", lat: 33.6846, lng: -118.0448 },
    { name: "Beachfront", lat: 53.6846, lng: -90.0448 },
    { name: "Beachfront", lat: 73.6846, lng: -100.0448 },
];
const titles = ["Modern", "Cozy", "Luxury", "Classic", "Elegant"];
const types = ["Apartment", "House", "Condo", "Vacation Home", "Penthouse"];
const amenities = [
    "Parking",
    "Balcony",
    "Pool",
    "Gym",
    "Garden",
    "Spa",
    "Elevator",
    "In-unit laundry facilities",
    "Children play area",
    "Internet",
];

export function generateProperty(id: number): Property {
    const title = titles[Math.floor(Math.random() * 5)];
    const type = types[Math.floor(Math.random() * 5)] as Property["type"];
    const randomLocation =
        locations[Math.floor(Math.random() * locations.length)];

    return {
        id,
        title: `${title} ${type}`,
        price: Math.floor(Math.random() * 1000000),
        size: Math.floor(Math.random() * 300) + 80,
        bedrooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 4) + 1,
        location: randomLocation,
        type: type,
        status: Math.random() > 0.5 ? "For Sale" : "For Rent",
        amenities: amenities.filter(() => Math.random() > 0.6),
        images: [
            `/dist/images/properties/property${id}-1.jpg`,
            `/dist/images/properties/property${id}-2.jpg`,
            `/dist/images/properties/property${id}-3.jpg`,
        ],
    };
}
