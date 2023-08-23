export interface IVector {
    x: number;
    y: number;
}

export interface IEntity {
    id: number;
    name: string;
    pos: IVector;
}

export interface ILevel {
    id: number;
    name: string;
    entities: IEntity[];
}
