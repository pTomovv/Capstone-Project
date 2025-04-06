export class MapComponent {
    private iframe?: HTMLIFrameElement;

    constructor(
        private containerId: string,
        private coordinates: { lat: number; lng: number }
    ) {}

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        this.iframe = document.createElement("iframe");
        this.iframe.width = "100%";
        this.iframe.height = "100%";
        this.iframe.loading = "lazy";
        this.iframe.allowFullscreen = true;
        this.iframe.src = `https://maps.google.com/maps?q=${this.coordinates.lat},${this.coordinates.lng}&z=14&markers=color:red%7C${this.coordinates.lat},${this.coordinates.lng}&output=embed`;

        container.appendChild(this.iframe);
    }

    destroy() {
        if (this.iframe) {
            this.iframe.remove();
        }
    }
}
