import NearestNeighborScalingHelper from "./NearestNeighborScalingHelper";

export default class Runner {
    private ctx: CanvasRenderingContext2D;
    private scaleHelper: NearestNeighborScalingHelper;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');
        this.scaleHelper = new NearestNeighborScalingHelper(canvas, this.ctx, 800, 600, false, undefined);
    }

    start() {
        this._tick();
    }

    update() {
        return true;
    }

    draw(ctx: CanvasRenderingContext2D) {

    }

    private _tick() {
        if(this.update()) {
            this.scaleHelper.tryRescale();
            this.ctx.save();
            this.draw(this.ctx);
            this.ctx.restore();
        }

        requestAnimationFrame(() => this._tick());
    }
}