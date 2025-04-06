import { Property, FilterCriteria, SortOptions } from "./types";

export class PropertyService {
    private static properties: Property[] | null = null;
    private static readonly ITEMS_PER_PAGE = 9;

    static async getProperties(): Promise<Property[] | void> {
        if (this.properties === null) {
            const response = await fetch("/dist/data.json");
            this.properties = await response.json();
        } else {
            return this.properties;
        }
    }

    static async getPaginatedProperties(
        page: number,
        filters: FilterCriteria,
        sort?: SortOptions
    ): Promise<{
        properties: Property[];
        total: number;
    }> {
        const all = await this.getProperties();
        const filtered = this.applyFilters(all!, filters);
        const sorted = this.applySorting(filtered, sort);

        const startIndex = (page - 1) * this.ITEMS_PER_PAGE;
        const endIndex = startIndex + this.ITEMS_PER_PAGE;

        return {
            properties: sorted.slice(startIndex, endIndex),
            total: filtered.length,
        };
    }

    private static applyFilters(
        properties: Property[],
        filters: FilterCriteria
    ): Property[] {
        return properties.filter((property) => {
            if (filters.status && filters.status !== "all") {
                const statusMap: Record<string, Property["status"]> = {
                    "for-sale": "For Sale",
                    "for-rent": "For Rent",
                };
                if (property.status !== statusMap[filters.status]) return false;
            }

            if (filters.minPrice && property.price < filters.minPrice) {
                return false;
            }

            if (filters.maxPrice && property.price > filters.maxPrice) {
                return false;
            }

            if (
                filters.minBedrooms &&
                property.bedrooms < filters.minBedrooms
            ) {
                return false;
            }
            if (
                filters.minBathrooms &&
                property.bathrooms < filters.minBathrooms
            ) {
                return false;
            }

            if (filters.searchQuery) {
                const searchLower = filters.searchQuery.toLowerCase();
                const matchesTitle = property.title
                    .toLowerCase()
                    .includes(searchLower);
                const matchesLocation = property.location.name
                    .toLowerCase()
                    .includes(searchLower);
                if (!matchesTitle && !matchesLocation) return false;
            }

            return true;
        });
    }

    private static applySorting(
        properties: Property[],
        sort?: SortOptions
    ): Property[] {
        if (!sort) {
            return properties;
        } else {
            return [...properties].sort((a, b) => {
                const valueA = a[sort.field];
                const valueB = b[sort.field];

                if (typeof valueA === "number" && typeof valueB === "number") {
                    return sort.order === "asc"
                        ? valueA - valueB
                        : valueB - valueA;
                }

                if (typeof valueA === "string" && typeof valueB === "string") {
                    return sort.order === "asc"
                        ? valueA.localeCompare(valueB)
                        : valueB.localeCompare(valueA);
                }

                return 0;
            });
        }
    }

    static async getPropertyById(id: number): Promise<Property | undefined> {
        const properties = await this.getProperties();
        return properties!.find((p) => p.id === id);
    }
}
