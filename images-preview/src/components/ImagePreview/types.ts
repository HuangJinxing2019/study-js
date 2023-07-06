export enum DIR {
  FOR = 'for',
  BACK = 'back',
}

export enum ROTATE {
  LEFT = 'left',
  RIGHT = 'right'
}

export enum ZOOM {
  IN = 'in',
  OUT = 'out'
}

export interface IImages {
  id: number;
  image: string;
  rotate: number;
  scale: number;
}

export interface IReactive {
  index: number,
  imageData: IImages[]
}