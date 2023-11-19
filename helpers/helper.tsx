import CoursesIcon from '../layout/Menu/icons/courses.svg';
import ServicesIcon from '../layout/Menu/icons/services.svg';
import ProductsIcon from '../layout/Menu/icons/products.svg';
import BooksIcon from '../layout/Menu/icons/books.svg';

import { TopLevelCategory } from '@/interfaces/page.interface';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Products },
	{ route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books }
];

export const priceRu = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');

export const declOfNum = (number: number, titles: [string, string, string]) => {
	const cases = [2, 0, 1, 1, 1, 2]; //  0 озывывов 1 отзыв 2 отзыва 5 отзывов
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}; // функция для склонения слов 