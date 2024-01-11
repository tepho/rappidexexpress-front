import { SpanLoader } from "./styles";

export enum Colors {
    'gray' = 'gray-100',
    'green' = 'green-300',
    'red' = 'red-500',
    'yellow' = 'yellow-500'
}

export interface LoaderProps {
    size: number
    biggestColor: keyof typeof Colors
    smallestColor: keyof typeof Colors
}

export function Loader({ size, biggestColor, smallestColor }: LoaderProps) {
    return (
        <SpanLoader size={size} biggestColor={biggestColor} smallestColor={smallestColor} />
    )
}