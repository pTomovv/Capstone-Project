import { PropertyService } from "../utils/PropertyService.js";
import { Property, PageComponent } from "../utils/types.js";

export class HomePage implements PageComponent {
    private currentSlide = 0;
    private intervalId?: number;
    private properties: Property[] = [];
    private sliderTrack!: HTMLElement;
    private sliderDots!: HTMLElement;

    async init() {
        this.properties = (await PropertyService.getProperties())!;
        this.render();
        this.setupSlider();
        this.startAutoSlide();
    }

    private render() {
        document.querySelector("main")!.innerHTML = `
            <section class="hero-slider">
                <div class="slider-container">
                    <div class="slider-track"></div>
                    <button class="slider-prev">‹</button>
                    <button class="slider-next">›</button>
                    <div class="slider-dots"></div>
                </div>
            </section>
        `;

        this.sliderTrack = document.querySelector(".slider-track")!;
        this.sliderDots = document.querySelector(".slider-dots")!;

        this.sliderTrack.innerHTML = this.properties
            .map(
                (property) => `
                <div class="slide" data-id="${property.id}">
                    <img src="${property.images[0]}" alt="${property.title}">
                    <div class="slide-content">
                        <h3>${property.title}</h3>
                        <p>${property.location.name}</p>
                    </div>
                </div>
            `
            )
            .join("");

        this.sliderDots.innerHTML = this.properties
            .map((_, index) => `<div class="dot" data-index="${index}"></div>`)
            .join("");
    }

    private setupSlider() {
        document
            .querySelector(".slider-prev")!
            .addEventListener("click", () => this.move(-1));
        document
            .querySelector(".slider-next")!
            .addEventListener("click", () => this.move(1));

        this.sliderDots.querySelectorAll(".dot").forEach((dot) => {
            dot.addEventListener("click", () =>
                this.jumpToSlide(parseInt(dot.getAttribute("data-index")!))
            );
        });

        this.sliderTrack.addEventListener("click", (e) => {
            const slide = (e.target as HTMLElement).closest(".slide");
            if (slide) {
                const propertyId = slide.getAttribute("data-id");
                window.location.hash = `#property/${propertyId}`;
            }
        });

        this.updateSlider();
    }

    private move(direction: number) {
        this.currentSlide =
            (this.currentSlide + direction + this.properties.length) %
            this.properties.length;
        this.updateSlider();
        this.resetAutoSlide();
    }

    private jumpToSlide(index: number) {
        this.currentSlide = index;
        this.updateSlider();
        this.resetAutoSlide();
    }

    private updateSlider() {
        this.sliderTrack.style.transform = `translateX(-${
            this.currentSlide * 100
        }%)`;

        this.sliderDots.querySelectorAll(".dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === this.currentSlide);
        });
    }

    private startAutoSlide() {
        this.intervalId = window.setInterval(() => this.move(1), 5000);
    }

    private resetAutoSlide() {
        window.clearInterval(this.intervalId);
        this.startAutoSlide();
    }

    destroy() {
        window.clearInterval(this.intervalId);
        document.querySelector("main")!.innerHTML = "";
    }
}
