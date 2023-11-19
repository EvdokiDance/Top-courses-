import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
	size?: 's' | 'm';
	color?: 'ghost' | 'green' | 'red' | 'gray' | 'primary';
	href?: string;
	children: ReactNode;
}