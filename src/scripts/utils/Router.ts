import { HomePage } from "../pages/HomePage.js";
import { GalleryPage } from "../pages/GalleryPage.js";
import { ContactPage } from "../pages/ContactPage.js";
import { PropertyPage } from "../pages/PropertyPage.js";
import { PageComponent } from "./types.js";
import { ErrorPage } from "../pages/ErrorPage.js";
export class Router {
    private static currentPage: PageComponent | null = null;
    private static routes: Record<string, PageComponent> = {
        home: new HomePage(),
        gallery: new GalleryPage("all"),
        contacts: new ContactPage(),
        property: new PropertyPage(0),
        missing: new ErrorPage(),
    };

    static init() {
        window.addEventListener("hashchange", () => this.handleRoute());
        this.handleRoute();
    }

    private static async handleRoute() {
        if (this.currentPage) {
            this.currentPage.destroy();
        }

        const hash = window.location.hash.substring(1) || "home";
        const [routePath, id] = hash.split("/");
        const [route, status] = routePath.split("?");

        if (!this.routes[route]) {
            window.location.hash = "#missing";
            return;
        }

        try {
            switch (route) {
                case "home":
                    this.currentPage = new HomePage();
                    this.currentPage.init();
                    break;
                case "gallery":
                    this.currentPage = new GalleryPage(
                        status as "all" | "for-sale" | "for-rent"
                    );
                    this.currentPage.init();
                    break;
                case "contacts":
                    this.currentPage = new ContactPage();
                    this.currentPage.init();
                    break;
                case "property":
                    if (id) {
                        const propertyId = parseInt(id);
                        this.currentPage = new PropertyPage(propertyId);
                        this.currentPage.init();
                    }
                    break;
                case "missing":
                    this.currentPage = new ErrorPage();
                    this.currentPage.init();
                    break;
            }
        } catch (error) {
            console.error("Route error:", error);
            window.location.hash = "#missing";
        }
    }
}
