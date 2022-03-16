import Point from "../../position/Point";

type PathStep = IMoveStep | ILineStep | IArcStep | ICloseStep;

export interface IMoveStep {
    type: 'move';
    to: Point;
}
export interface ILineStep {
    type: 'line';
    to: Point;
}
export interface IArcStep {
    type: 'arc';
    center: Point;
    radius: number;
    fromAngle: number;
    toAngle: number;
    counterClockwise?: boolean;
}
export interface ICloseStep {
    type: 'close';
}

export default PathStep;