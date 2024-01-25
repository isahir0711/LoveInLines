export interface Point{
    lineWidht:number,
    colorCode:string,
    xPosition:number,
    yPosition:number
}

export interface Stroke{
    point2: Point[]
}