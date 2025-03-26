import { Property } from "./types";

export function validateProperties(data: Property[]): data is Property[] {
    return (
        Array.isArray(data) &&
        data.every(
            (property) =>
                typeof property.id === "number" &&
                typeof property.title === "string" &&
                Array.isArray(property.images) &&
                property.images.length === 3 &&
                property.location &&
                typeof property.location.lat === "number" &&
                typeof property.location.lng === "number"
        )
    );
}
