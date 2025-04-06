import { PageComponent } from "../utils/types";
import { MapComponent } from "../components/Map.js";

export class ContactPage implements PageComponent {
    private map?: MapComponent;

    init() {
        this.render();
        this.renderMap();
    }

    private render() {
        document.querySelector("main")!.innerHTML = `
            <section class="contacts-page">
                <div class="contact-info">
                    <h1>Our Office</h1>
                    <p class="description">
                        We're dedicated to helping you find your perfect property. 
                        Visit us during business hours or get in touch using the 
                        contact information below.
                    </p>
                    
                    <div class="contact-details">
                        <address>
                            <p> 123 Golden Estate Street</p>
                            <p> New York, NY 10001</p>
                            <p> <a href="">+359 12 345 6789</a></p>
                            <p> <a href="">info@goldenestate.com</a></p>
                        </address>
                        
                        <div class="business-hours">
                            <h2>Business Hours</h2>
                            <p>Monday - Friday: 9 AM - 7 PM</p>
                            <p>Saturday: 10 AM - 5 PM</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                    
                    <div class="social-links">
                        <a href="#" target="_blank">Facebook</a>
                        <a href="#" target="_blank">Twitter</a>
                        <a href="#" target="_blank">LinkedIn</a>
                    </div>
                </div>
                
                <div class="contact-map">
                    <div class="map-container" id="map-container"></div>
                </div>
            </section>
        `;
    }

    private renderMap() {
        this.map = new MapComponent("map-container", {
            lat: 40.7128,
            lng: -74.006,
        });
        this.map.render();
    }

    destroy() {
        this.map?.destroy();
        document.querySelector("main")!.innerHTML = "";
    }
}
