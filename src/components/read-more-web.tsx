import type { CSSProperties } from 'react';
import React from 'react';
import { ReadMore } from './read-more';

export interface ReadMoreWebProps {
	truncate: number | undefined;
	showMoreText?: React.ReactNode;
	showLessText?: React.ReactNode;
	className?: string;
	style?: CSSProperties;
	children: React.ReactNode;
	endTruncate?: string;
}

export const ReadMoreWeb: React.FC<ReadMoreWebProps> = ({
	truncate,
	showMoreText,
	showLessText,
	className,
	style,
	children,
	endTruncate,
}) => {
	const [expanded, setExpanded] = React.useState(false);

	const onShowMore = React.useCallback(() => setExpanded(true), []);

	const onShowLess = React.useCallback(() => setExpanded(false), []);

	return (
		<ReadMore
			truncate={truncate}
			endTruncate={endTruncate}
			expanded={expanded}
			showMore={
				<>
					{endTruncate ? undefined : '... '}
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
