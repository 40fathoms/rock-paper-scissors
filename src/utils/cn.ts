import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge tailwind classes
 *
 * @param {ClassValue[]} inputs - The classes to be merged
 * @returns {string} - The merged classes
 */
const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export { cn };
