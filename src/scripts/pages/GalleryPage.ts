import { PropertyService } from "../utils/PropertyService.js";
import {
    FilterCriteria,
    SortOptions,
    Property,
    PageComponent,
} from "../utils/types.js";

export class GalleryPage implements PageComponent {
    private currentPage = 1;
    private itemsPerPage = 10;
    private filters: FilterCriteria = {};
    private sort?: SortOptions;

    constructor(private initialStatus?: "all" | "for-sale" | "for-rent") {
        if (initialStatus && initialStatus !== "all") {
            this.filters.status = initialStatus;
        }
    }

    async init() {
        this.renderLayout();
        this.setStatus();
        await this.loadProperties();
        this.setupEventListeners();
    }

    private renderLayout() {
        document.querySelector("main")!.innerHTML = `
            <section class="gallery-page">
                <section class="gallery-controls">
                    <div class="search-filter">
                        <input type="text" id="search" placeholder="Search properties...">
                    </div>
                    
                    <div class="filters">
                        <div class="filter-group">
                            <label>Price Range:</label>
                            <input type="number" id="min-price" placeholder="Min">
                            <input type="number" id="max-price" placeholder="Max">
                        </div>

                        <div class="filter-group">
                            <label>Bedrooms:</label>
                            <select id="bedrooms">
                                <option value="0">Any</option>
                                <option value="2">At least 2</option>
                                <option value="3">At least 3</option>
                            </select>
                        </div>

                        <div class="filter-group">
                            <label>Bathrooms:</label>
                            <select id="bathrooms">
                                <option value="0">Any</option>
                                <option value="2">At least 2</option>
                                <option value="3">At least 3</option>
                            </select>
                        </div>

                        <div class="filter-group">
                            <label>Status:</label>
                            <select id="status">
                                <option value="all">All</option>
                                <option value="for-sale">For Sale</option>
                                <option value="for-rent">For Rent</option>
                            </select>
                        </div>

                    </div>

                    <div class="sorting">
                        <label>Sort</label>
                        <select id="sort">
                            <option value="">Default</option>
                            <option value="price-asc">Price: Ascending</option>
                            <option value="price-desc">Price: Descending</option>
                            <option value="size-asc">Area: Ascending</option>
                            <option value="size-desc">Area: Descending</option>
                            <option value="bathrooms-asc">Bathrooms: Ascending</option>
                            <option value="bathrooms-desc">Bathrooms: Descending</option>
                            <option value="bedrooms-asc">Bedrooms: Ascending</option>
                            <option value="bedrooms-desc">Bedrooms: Descending</option>
                            <option value="title-asc">Title: Ascending</option>
                            <option value="title-desc">Title: Descending</option>
                        </select>
                    </div>
                </section>

                <div class="cards-container"></div>
                <div class="pagination"></div>
            </section>
        `;
    }
    private setStatus() {
        const statusSelect = document.querySelector(
            "#status"
        ) as HTMLSelectElement;
        statusSelect.value = this.initialStatus || "all";
    }

    private async loadProperties() {
        const result = await PropertyService.getPaginatedProperties(
            this.currentPage,
            this.filters,
            this.sort
        );

        this.renderCards(result.properties);
        this.renderPagination(result.total);
    }

    private renderCards(properties: Property[]) {
        const container = document.querySelector(".cards-container")!;
        container.innerHTML = properties
            .map(
                (property) => `
                <article class="property-card" id="${property.id}">
                    <img src="${property.images[0]}" alt="${property.title}">
                    <h3>${property.title}</h3>
                    <p class="status">${property.status}</p>
                    <p class="price">$${property.price.toString()}</p>
                    <p class="details">
                        ${property.bedrooms} beds | 
                        ${property.bathrooms} baths | 
                        ${property.size} m² | 
                        ${property.location.name}
                    </p>
                </article>
            `
            )
            .join("");
    }

    private renderPagination(totalItems: number) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const pagination = document.querySelector(".pagination")!;

        pagination.innerHTML = Array.from(
            { length: totalPages },
            (_, i) => `
            <button class="page ${i + 1 === this.currentPage ? "active" : ""}" 
                    data-page="${i + 1}">
                ${i + 1}
            </button>
        `
        ).join("");
    }

    private setupEventListeners() {
        document.querySelector("#search")!.addEventListener("input", (e) => {
            this.filters.searchQuery = (e.target as HTMLInputElement).value;
            this.currentPage = 1;
            this.loadProperties();
        });

        document
            .querySelectorAll('.filter-group input[type="number"]')
            .forEach((input) => {
                input.addEventListener("change", () => {
                    this.filters.minPrice = parseInt(
                        (
                            document.querySelector(
                                "#min-price"
                            ) as HTMLInputElement
                        ).value
                    );
                    this.filters.maxPrice = parseInt(
                        (
                            document.querySelector(
                                "#max-price"
                            ) as HTMLInputElement
                        ).value
                    );
                    this.currentPage = 1;
                    this.loadProperties();
                });
            });

        document.querySelectorAll(".filter-group select").forEach((select) => {
            select.addEventListener("change", (e) => {
                const target = e.target as HTMLSelectElement;
                if (target.id === "bedrooms") {
                    this.filters.minBedrooms = parseInt(target.value);
                } else if (target.id === "bathrooms") {
                    this.filters.minBathrooms = parseInt(target.value);
                } else {
                    this.filters.status =
                        target.value as FilterCriteria["status"];
                }
                this.currentPage = 1;
                this.loadProperties();
            });
        });
        document.querySelector("#sort")!.addEventListener("change", (e) => {
            const [field, order] = (e.target as HTMLSelectElement).value.split(
                "-"
            );
            this.sort = field
                ? {
                      field: field as
                          | "price"
                          | "bedrooms"
                          | "bathrooms"
                          | "size"
                          | "title",
                      order: order as "asc" | "desc",
                  }
                : undefined;
            this.loadProperties();
        });

        document
            .querySelector(".pagination")!
            .addEventListener("click", (e) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains("page")) {
                    this.currentPage = parseInt(target.dataset.page || "1");
                    this.loadProperties();
                }
            });

        document
            .querySelector(".cards-container")!
            .addEventListener("click", (e) => {
                const card = (e.target as HTMLElement).closest(
                    ".property-card"
                );
                if (card) {
                    const propertyId = card.id;
                    window.location.hash = `#property/${propertyId}`;
                }
            });
    }

    destroy() {
        document.querySelector("main")!.innerHTML = "";
    }
}
