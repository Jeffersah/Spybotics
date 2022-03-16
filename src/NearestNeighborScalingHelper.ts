import Point from "./Point";

export default class NearestNeighborScalingHelper {

    public scaleFactor: number;
    constructor(public canvas: HTMLCanvasElement, public context: CanvasRenderingContext2D, public baseWidth: number, public baseHeight: number, private scaleByWindowSize: boolean, public onResize: (() => void)|undefined) {
        this.scaleFactor = 0;
        this.rescale();
        if (this.scaleByWindowSize) {
            window.addEventListener('resize', () => this.rescale());
        }
        else {
            canvas.parentElement.addEventListener('resize', () => this.rescale());
        }
    }

    public detatch() {
        if (this.scaleByWindowSize) {
            window.removeEventListener('resize', () => this.rescale());
        }
        else {
            this.canvas.parentElement.removeEventListener('resize', () => this.rescale());
        }
    }

    public rescale() {
        let currentWidth: number;
        let currentHeight: number;
        if (this.scaleByWindowSize) {
            currentWidth = window.innerWidth;
            currentHeight = window.innerHeight;
        }
        else {
            currentWidth = this.canvas.parentElement.clientWidth;
            currentHeight = this.canvas.parentElement.clientHeight;
        }
        const maxXScale = currentWidth / this.baseWidth;
        const maxYScale = currentHeight / this.baseHeight;

        const newScaleFactor = Math.max(Math.floor(Math.min(maxXScale, maxYScale)), 1);
        if(newScaleFactor == this.scaleFactor) return;

        this.scaleFactor = newScaleFactor
        this.canvas.width = this.scaleFactor * this.baseWidth;
        this.canvas.height = this.scaleFactor * this.baseHeight;
        this.canvas.style.width = (this.scaleFactor * this.baseWidth) + 'px';
        this.canvas.style.height = (this.scaleFactor * this.baseHeight) + 'px';

        this.context.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, 0, 0);

        if (this.onResize !== undefined) {
            this.onResize();
        }
    }

    public applyTransform(ctx: CanvasRenderingContext2D){
        ctx.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, 0, 0);
    }

    public screenToPixel(point: Point) :Point {
        return new Point(point.x / this.scaleFactor, point.y / this.scaleFactor);
    }

    public pixelToScreen(point: Point):Point {
        return new Point(point.x * this.scaleFactor, point.y * this.scaleFactor);
    }

    public tryRescale() {
        let currentWidth: number;
        let currentHeight: number;
        if (this.scaleByWindowSize) {
            currentWidth = window.innerWidth;
            currentHeight = window.innerHeight;
        }
        else {
            currentWidth = this.canvas.parentElement.clientWidth;
            currentHeight = this.canvas.parentElement.clientHeight;
        }

        if(this.canvas.width === currentWidth && this.canvas.height === currentHeight) { return }
        this.rescale();
    }
}