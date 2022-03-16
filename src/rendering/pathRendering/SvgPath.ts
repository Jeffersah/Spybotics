import Rect from "../../position/Rectangle";
import { RotTransformCanvas } from "../../CanvasHelpers";
import Point from "../../position/Point";
import IRenderable, { ISimpleRenderable } from "../IRenderable";
import IRenderableSource from "../IRenderableSource";
import PathStep from "./IPathStep";

export default class SvgPath implements IRenderable, IRenderableSource {

    public origin: Point;

    constructor(public source: CanvasImageSource, public path: PathStep[], public stroke?: string, public fill?: string, origin?: Point) {
        this.origin = origin ?? new Point(0.5, 0.5);
    }


    getPixelSize(): Point {
        return undefined;
    }

    getRenderable(): IRenderable {
        return this;
    }

    tick(): boolean {
        return false;
    }

    draw(ctx: CanvasRenderingContext2D, destination: Rect, rotation: number): void {
        ctx.save();
        RotTransformCanvas(ctx, destination.x, destination.y, this.origin.x, this.origin.y, rotation);
        ctx.scale(destination.w/2, destination.h/2);
        ctx.beginPath();
        for(const pathSegment of this.path) {
            switch(pathSegment.type) {
                case 'move':
                    ctx.moveTo(pathSegment.to.x, pathSegment.to.y);
                    break;
                case 'line':
                    ctx.lineTo(pathSegment.to.x, pathSegment.to.y);
                    break;
                case 'arc':
                    ctx.arc(pathSegment.center.x, pathSegment.center.y, pathSegment.radius, pathSegment.fromAngle, pathSegment.toAngle, pathSegment.counterClockwise);
                    break;
                case 'close':
                    ctx.closePath();
                    break;
            }
        }

        if(this.stroke){
            ctx.strokeStyle = this.stroke;
            ctx.stroke();
        }

        if(this.fill) {
            ctx.fillStyle = this.fill;
            ctx.fill();
        }

        ctx.restore();
    }
}