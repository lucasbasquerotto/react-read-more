import React from 'react';

interface ParseResult {
	content: React.ReactNode | React.ReactNode[];
	remaining: number;
	endTruncate?: string;
}

type Parse = (root: ParseResult, parse: Parse) => ParseResult;

const parseString = (
	text: string,
	remaining: number,
	endTruncate: string,
): ParseResult => {
	if (!text?.length) {
		return { content: text, remaining };
	}

	const newText =
		remaining <= 0
			? ''
			: text.length > remaining
				? text.substring(0, remaining) + endTruncate
				: text;

	return { content: newText, remaining: remaining - text.length };
};

const parse: Parse = (root, parseCallback) => {
	const { content, remaining = 0, endTruncate = '' } = root;

	if (typeof content === 'string') {
		const result = parseString(content, remaining, endTruncate);
		return result;
	} else if (React.isValidElement(content)) {
		const children = (content.props as { children?: React.ReactNode })
			?.children;

		if (children != null) {
			const innerResult = parseCallback(
				{
					content: children,
					remaining,
					endTruncate,
				},
				parseCallback,
			);
			const newContent = React.cloneElement(content, {}, innerResult.content);
			return { content: newContent, remaining: innerResult.remaining };
		}
	} else if (Array.isArray(content)) {
		const list: React.ReactNode[] = [];
		let newRemaining = remaining;

		for (const child of content) {
			const parsed = parseCallback(
				{ content: child, remaining: newRemaining, endTruncate },
				parseCallback,
			);
			newRemaining = parsed.remaining;
			const newContent = (
				<React.Fragment key={list.length}>{parsed.content}</React.Fragment>
			);
			list.push(newContent);

			if (newRemaining < 0) {
				break;
			}
		}

		return { content: list, remaining: newRemaining, endTruncate };
	}

	return root;
};

export interface ReadMoreAdditionalProps {
	expanded?: boolean;
	showMore?: React.ReactNode;
	showLess?: React.ReactNode;
	endTruncate?: string;
}

const ReadMoreInner: React.FC<
	{
		children: React.ReactNode;
		truncate: number;
	} & ReadMoreAdditionalProps
> = ({ truncate, expanded, showMore, showLess, children, endTruncate }) => {
	const root: ParseResult = {
		content: children,
		remaining: truncate,
		endTruncate,
	};
	const result = parse(root, parse);

	return (
		<>
			{expanded ? children : result.content}
			{result.remaining < 0 ? (expanded ? showLess : showMore) : undefined}
		</>
	);
};

export interface ReadMoreOptions extends ReadMoreAdditionalProps {
	truncate?: number;
}

export type ReadMoreProps = ReadMoreOptions & {
	children: React.ReactNode;
};

export const ReadMore: React.FC<ReadMoreProps> = ({
	truncate,
	children,
	...props
}) => {
	return truncate != null ? (
		<ReadMoreInner {...props} truncate={truncate}>
			{children}
		</ReadMoreInner>
	) : (
		<>{children}</>
	);
};
