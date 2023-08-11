export const randomInt = (min: number, max: number) => Math.floor(randomFloat(min, max));

export const randomFloat = (min: number, max: number) => min + (max-min+1)*Math.random();