import Point, {splitArgs} from "../position/Point";

export default class Arr2d<T> {
    private data: T[][];

    constructor(public width: number, public height: number, defaultValue?: T) {
        this.data = [];
        for(let i = 0; i < width; i++) {
            const col:T[] = [];
            this.data.push(col);
            for(let j = 0; j < height; j++) {
                col.push(defaultValue);
            }
        }
    }

    get(x: number, y: number):T;
    get(pt: Point): T;
    get(ptx: Point|number, y?: number):T {
        let result = splitArgs(ptx, y);
        if(result.x < 0 || result.x >= this.width || result.y < 0 || result.y >= this.height) return undefined;
        return this.data[result.x][result.y];
    }

    set(value: T, x: number, y: number):void;
    set(value: T, pt: Point): void;
    set(value: T, ptx: Point|number, y?: number): void {
        let result = splitArgs(ptx, y);
        if(result.x < 0 || result.x >= this.width || result.y < 0 || result.y >= this.height) throw 'out of range';
        this.data[result.x][result.y] = value;
    }

    iterate(fn: (value: T, x: number, y: number) => void): void {
        for(let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++) {
                fn(this.data[i][j], i, j);
            }
        }
    }

}