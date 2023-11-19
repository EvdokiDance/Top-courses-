import { AdvantagesProps } from "./Advantages.props";
import styles from "./Advantages.module.css";
import Check from './check.svg';
import { Htag } from '../Htag/Htag';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<div className={styles.advantages}>
			{advantages.map((adv) => (
				<div key={adv._id} className={styles.advWrapper}>
					<Check />
					<Htag tag='h3' className={styles.advTitle}>
						{adv.title}
					</Htag>
					<p className={styles.advDescription}>
						{adv.description}
					</p>
				</div>
			))}
		</div>
	);
};
