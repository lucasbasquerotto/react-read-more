import { ReadMore } from './read-more';
import React, { CSSProperties } from 'react';

export interface ReadMoreWebProps {
	truncate: number | undefined;
	showMoreText?: React.ReactNode;
	showLessText?: React.ReactNode;
	className?: string;
	style?: CSSProperties;
	children: React.ReactNode;
}

export const ReadMoreWeb: React.FC<ReadMoreWebProps> = ({
	truncate,
	showMoreText,
	showLessText,
	className,
	style,
	children,
}) => {
	const [expanded, setExpanded] = React.useState(false);

	const onShowMore = React.useCallback(() => setExpanded(true), []);

	const onShowLess = React.useCallback(() => setExpanded(false), []);

	return (
		<ReadMore
			truncate={truncate}
			expanded={expanded}
			showMore={
				<>
					{'... '}
					<button onClick={onShowMore} className={className} style={style}>
						{showMoreText ?? 'Show more'}
					</button>
				</>
			}
			showLess={
				<>
					{' '}
					<button onClick={onShowLess} className={className} style={style}>
						{showLessText ?? 'Show less'}
					</button>
				</>
			}
		>
			{children}
		</ReadMore>
	);
};

export default ReadMoreWeb;
