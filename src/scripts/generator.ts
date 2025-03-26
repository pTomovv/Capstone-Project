import { Property } from "./types";

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

export function generateProperty(id: number): Property {
    const randomLocation =
        locations[Math.floor(Math.random() * locations.length)];

    return {
        id,
        title: `${
            ["Modern", "Cozy", "Luxury", "Classic", "Elegant"][
                Math.floor(Math.random() * 5)
            ]
        } ${
            ["Apartment", "House", "Condo", "Vacation Home", "Penthouse"][
                Math.floor(Math.random() * 5)
            ]
        }`,
        price: Math.floor(Math.random() * 1000000),
        size: Math.floor(Math.random() * 300) + 80,
        bedrooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 4) + 1,
        location: randomLocation,
        type: ["Apartment", "House", "Condo", "Vacation Home", "Penthouse"][
            Math.floor(Math.random() * 5)
        ] as Property["type"],
        status: Math.random() > 0.5 ? "For Sale" : "For Rent",
        amenities: [
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
        ].filter(() => Math.random() > 0.6),
        images: [
            `images/property${id}-1.jpg`,
            `images/property${id}-2.jpg`,
            `images/property${id}-3.jpg`,
        ],
    };
}
