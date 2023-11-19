import { useState } from "react";
import { Button, Htag, Input, Ptag, Tag, Textarea, Search } from "../components/index";
import { Rating } from "../components/Rating/Rating";
import { withLayout } from "@/layout/Layout";
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '@/interfaces/menu.interface';



function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(1);
	return (
		<>
			<Htag tag="h1">Текст</Htag>
			<Button className="saffsasf" arrow="right" appearance="primary">
				Узнать подробнее
			</Button>
			<Button appearance="ghost" arrow="right">
				Узнать подробнее
			</Button>
			<Ptag size="l">
				Напишу сразу в двух курсах, так как проходил оба. Java будет многим
			</Ptag>
			<Tag size="s" color="gray">
				Gray
			</Tag>
			<Tag size="m" color="green">Green</Tag>
			<Tag>Ghost</Tag>
			<Tag size="s" color="red">Red</Tag>
			<Tag href="#" color="primary">Primary</Tag>
			<Rating rating={rating} isEditable setRating={setRating} />
			<Input placeholder='Имя' />
			<Textarea placeholder='Текст отзыва' />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}