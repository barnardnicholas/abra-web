import { useRef, useEffect } from 'react';

export function usePrevious(value: any) {
    const ref = useRef<any>(value);

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export function isEmpty(item: any): boolean {
    if (Array.isArray(item)) return !item.length;
    if (typeof item === 'string') return !item.trim().length;
    if (item instanceof Date) return isNaN(item.valueOf());
    if (typeof item === 'object') return isObjEmpty(item);
    if (typeof item === 'number') return false;

    return !item;
}

export function isObjEmpty(obj: Record<string, unknown>): boolean {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

export function getRandomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function trimFreq(freq: number, deviation: number = 0.03): number {
    if (freq > 1 - deviation) return 1 - deviation;
    if (freq < deviation) return deviation;
    return freq;
}
