import { MapComponent } from "../components/Map.js";
import { PageComponent, Property } from "../utils/types.js";
import { PropertyService } from "../utils/PropertyService.js";

export class PropertyPage implements PageComponent {
    private property?: Property;
    private map?: MapComponent;

    constructor(private propertyId: number) {}

    async init() {
        this.property = await PropertyService.getPropertyById(this.propertyId);
        if (!this.property) {
            window.location.hash = "#missing";
            return;
        }
        this.render();
        this.setupGoingBackToGallery();
        this.renderMap();
    }

    private render() {
        document.querySelector("main")!.innerHTML = `
            <article class="property-details">
                <div class="property-header">
                    <h1>${this.property!.title}</h1>
                    <button class="back-btn"> Back to Gallery</button>
                </div>
                
                <div class="property-images">
                    ${this.property!.images.map(
                        (img) => `
                        <img src="${img}" alt="${this.property!.title}">
                    `
                    ).join("")}
                </div>

                <div class="property-info">
                    <div class="price-section">
                        <h2>$${this.property!.price.toString()}</h2>
                        <p class="status">${this.property!.status}</p>
                    </div>

                    <div class="details-grid">
                        <div>
                            <h3>Property Details</h3>
                            <p> ${this.property!.type}</p>
                            <p>Bedrooms: ${this.property!.bedrooms}</p>
                            <p>Bathrooms: ${this.property!.bathrooms}</p>
                            <p>Size: ${this.property!.size}m²</p>
                        </div>
                        <div>
                            <h3>Location</h3>
                            <p>${this.property?.location.name}</p>
                        </div>

                        <div>
                            <h3>Amenities</h3>
                            <ul class="amenities">
                                ${this.property!.amenities.map(
                                    (a) => `<li>${a}</li>`
                                ).join("")}
                            </ul>
                        </div>
                    </div>

                    <div id="property-map" class="property-map"></div>
                </div>
            </article>
        `;
    }

    private setupGoingBackToGallery() {
        document.querySelector(".back-btn")!.addEventListener("click", () => {
            window.location.hash = "#gallery";
        });
    }

    private renderMap(location = this.property!.location) {
        this.map = new MapComponent("property-map", {
            lat: location.lat,
            lng: location.lng,
        });
        this.map.render();
    }

    destroy() {
        this.map?.destroy();
        document.querySelector("main")!.innerHTML = "";
    }
}
