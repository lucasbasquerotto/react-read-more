import { ReadMoreWeb } from 'react-shorten';
import './styles.css';
import React from 'react';

const StyledReadMore: React.FC<{
	truncate?: number;
	endTruncate?: string;
	children: React.ReactNode;
}> = ({ truncate, endTruncate, children }) => (
	<ReadMoreWeb
		truncate={truncate}
		showMoreText="Show more"
		showLessText="Show less"
		endTruncate={endTruncate}
		className="read-more-btn"
	>
		{children}
	</ReadMoreWeb>
);

export default function App() {
	const [dynamic, setDynamic] = React.useState(110);

	const onChangeDynamic = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newDynamic = parseInt(e.target.value, 10) || 0;
			setDynamic(newDynamic < 0 ? 0 : newDynamic);
		},
		[],
	);
	return (
		<div className="app">
			<h1 className="main-title">Examples</h1>

			<div className="info-section">
				<p>
					<code>npm install react-shorten</code>
				</p>
				<p>
					Package:{' '}
					<a href="https://www.npmjs.com/package/react-shorten">
						https://www.npmjs.com/package/react-shorten
					</a>
				</p>
				<p>
					Repository:{' '}
					<a href="https://github.com/lucasbasquerotto/react-read-more">
						https://github.com/lucasbasquerotto/react-read-more
					</a>
				</p>
			</div>

			<div className="section" data-testid="small-text">
				<h2 className="title">Small Text</h2>

				<div className="content">
					<StyledReadMore truncate={110}>
						Lorem ipsum dolor sit amet.
					</StyledReadMore>
				</div>
			</div>

			<div className="section" data-testid="large-text">
				<h2 className="title">Large Text</h2>

				<div className="content">
					<StyledReadMore truncate={110}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
						ullamcorper, odio eu aliquam ultricies, enim sapien aliquet arcu,
						quis aliquam diam massa eu nisl. Sed vitae nunc eget nunc
						ullamcorper aliquet. Sed euismod, nisl eget aliquam ultricies, justo
						nisl aliquet nunc, quis aliquam diam massa eu nisl. Sed vitae nunc
						eget nunc ullamcorper aliquet. Sed euismod, nisl eget aliquam
						ultricies, justo nisl aliquet nunc, quis aliquam diam massa eu nisl.
						Sed vitae nunc eget nunc ullamcorper aliquet. Sed euismod, nisl eget
						aliquam ultricies, justo nisl aliquet nunc, quis aliquam diam massa
						eu nisl. Sed vitae nunc eget nunc ullamcorper aliquet. Sed euismod,
						nisl eget aliquam ultricies, justo nisl aliquet nunc, quis aliquam
						diam massa eu nisl. Sed vitae nunc eget nunc ullamcorper aliquet.
						Sed euismod, nisl eget aliquam ultricies, justo nisl aliquet nunc,
						quis aliquam diam massa eu nisl. Sed vitae nunc eget nunc
						ullamcorper aliquet. Sed euismod, nisl eget aliquam ultricies, justo
						nisl aliquet nunc, quis aliquam diam massa eu nisl. Sed vitae nunc
						eget nunc ullamcorper aliquet. Sed euismod, nisl eget aliquam
						ultricies, justo nisl aliquet nunc, quis aliquam diam massa eu nisl.
						Sed vitae nunc eget nunc ullamcorper aliquet. Sed euismod, nisl eget
						aliquam ultricies, justo nisl aliquet nunc, quis aliquam diam massa
						eu nisl. Sed vitae nunc eget nunc ullamcorper aliquet. Sed euismod,
						nisl eget aliquam ultricies, justo nisl aliquet nunc, quis aliquam
						diam massa eu nisl.
					</StyledReadMore>
				</div>
			</div>

			<div className="section" data-testid="html-text">
				<h2 className="title">Text with HTML</h2>

				<div className="content">
					<StyledReadMore truncate={110}>
						Lorem ipsum dolor sit amet,{' '}
						<i>
							<u>
								consectetur adipiscing elit. Sed ullamcorper, odio eu aliquam
								ultricies, enim sapien aliquet arcu, quis aliquam diam massa eu
								nisl. Sed vitae nunc eget nunc ullamcorper aliquet.
							</u>
						</i>{' '}
						Sed euismod, nisl eget aliquam ultricies, justo nisl aliquet nunc,
						quis aliquam diam massa eu nisl. Sed vitae nunc eget nunc
						ullamcorper aliquet.
					</StyledReadMore>
				</div>
			</div>

			<div className="section" data-testid="link-text">
				<h2 className="title">Text with Link</h2>

				<div className="content">
					<StyledReadMore truncate={110}>
						Lorem ipsum dolor sit amet,{' '}
						<a href="http://localhost:3000" className="link">
							consectetur adipiscing elit. Sed ullamcorper, odio eu aliquam
							ultricies, enim sapien aliquet arcu, quis aliquam diam massa eu
							nisl. Sed vitae nunc eget nunc ullamcorper aliquet.
						</a>{' '}
						Sed euismod, nisl eget aliquam ultricies, justo nisl aliquet nunc,
						quis aliquam diam massa eu nisl. Sed vitae nunc eget nunc
						ullamcorper aliquet.
					</StyledReadMore>
				</div>
			</div>

			<div className="section" data-testid="end-truncate">
				<h2 className="title">
					Truncated text with content inside the last tag
				</h2>

				<div className="content">
					<StyledReadMore truncate={110} endTruncate="...">
						Lorem ipsum dolor sit amet,{' '}
						<a href="http://localhost:3000" className="link">
							consectetur adipiscing elit. Sed ullamcorper, odio eu aliquam
							ultricies, enim sapien aliquet arcu, quis aliquam diam massa eu
							nisl. Sed vitae nunc eget nunc ullamcorper aliquet.
						</a>{' '}
						Sed euismod, nisl eget aliquam ultricies, justo nisl aliquet nunc,
						quis aliquam diam massa eu nisl. Sed vitae nunc eget nunc
						ullamcorper aliquet.
					</StyledReadMore>
				</div>
			</div>

			<div className="section" data-testid="link-text">
				<h2 className="title">Different character limits</h2>

				<input
					type="tel"
					value={dynamic}
					onChange={onChangeDynamic}
					placeholder="Dynamic truncate"
				/>

				<div className="content">
					<StyledReadMore truncate={dynamic}>
						Lorem ipsum dolor sit amet,{' '}
						<a href="http://localhost:3000" className="link">
							consectetur adipiscing elit. Sed ullamcorper, odio eu aliquam
							ultricies, enim sapien aliquet arcu, quis aliquam diam massa eu
							nisl. Sed vitae nunc eget nunc ullamcorper aliquet.
						</a>{' '}
						Sed euismod, nisl eget aliquam ultricies,{' '}
						<i>
							<u>justo nisl aliquet nunc,</u>
						</i>{' '}
						quis aliquam diam massa eu nisl. Sed vitae nunc eget nunc
						ullamcorper aliquet.
					</StyledReadMore>
				</div>
			</div>
		</div>
	);
}
