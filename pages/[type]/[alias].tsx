import { withLayout } from "@/layout/Layout";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { MenuItem } from '@/interfaces/menu.interface';
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '@/interfaces/product.interface';
import { TopLevelCategory, TopPageModel } from '@/interfaces/page.interface';
import { firstLevelMenu } from '@/helpers/helper';
import { TopPageComponent } from '@/page-components';


function TopPage({ firstCategory, page, products }: PageProps): JSX.Element {

return <TopPageComponent firstCategory={firstCategory} page={page} products={products}/>;
}

export default withLayout(TopPage);


export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
			firstCategory: m.id
		});
		paths = paths.concat(menu.flatMap(menuItem => menuItem.pages.map(p => `/${m.route}/${p.alias}`)));
	}
	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		};
	}
	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);

	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	}

	try {
		const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
			firstCategory: firstCategoryItem.id
		});
		if (menu.length == 0) {
			return {
				notFound: true
			};
		}
		const { data: page } = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
		const { data: products } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
			category: page.category,
			limit: 10
		});

		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products
			}
		};
	} catch {
		return {
			notFound: true
		};
	}
};

interface PageProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}