import { PageComponent } from "../utils/types";

export class ErrorPage implements PageComponent {
    init() {
        this.render();
        this.setupEventListeners();
    }

    private render() {
        document.querySelector("main")!.innerHTML = `
            <section class="error-page">
                <div class="error-content">
                    <h1 class="error-code">404</h1>
                    <h2 class="error-message">NOT FOUND</h2>
                    <p>Oops! Something went wrong. Let's get you back home.</p>
                    <button class="home-button">Return to Homepage</button>
                </div>
            </section>
        `;
    }

    private setupEventListeners() {
        document
            .querySelector(".home-button")!
            .addEventListener("click", () => {
                window.location.hash = "#home";
            });
    }

    destroy() {
        document.querySelector("main")!.innerHTML = "";
    }
}
