import Point from "../position/Point";
import Rectangle from "../position/Rectangle";
import IRenderable from "./IRenderable";

export class ScaleRenderable implements IRenderable {

    constructor(private source: IRenderable, public scale: Point) {
    }

    tick(): boolean {
        return this.source.tick();
    }

    draw(ctx: CanvasRenderingContext2D, position: Rectangle, rotation: number): void {
        this.source.draw(ctx, new Rectangle(position.x, position.y, position.w * this.scale.x, position.h * this.scale.y), rotation);
    }
}