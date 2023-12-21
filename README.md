# React Shorten

<div align="center">

[![npm downloads](https://img.shields.io/npm/dm/react-shorten.svg?style=for-the-badge)](https://www.npmjs.com/package/react-shorten)
[![npm](https://img.shields.io/npm/dt/react-shorten.svg?style=for-the-badge)](https://www.npmjs.com/package/react-shorten)
[![npm](https://img.shields.io/npm/l/react-shorten?style=for-the-badge)](https://github.com/lucasbasquerotto/react-read-more/blob/master/LICENCE)

</div>

<p align="center">
  <a href="#quickstart">Quickstart</a> |
  <a href="https://github.com/lucasbasquerotto/react-read-more/tree/master/examples/src/app.tsx">Examples</a> |
  <a href="https://lucasbasquerotto.github.io/react-read-more">Demo</a>
</p>

### Features

-   Base `ReadMore` component that can be used both in React DOM (Web) and in React Native to truncate text (it also allows showing more or less text).
-   Component `ReadMoreWeb` that can be used directly in react-dom, only requiring the length to truncate and the text itself, removing the need to handle the `expanded` state of the base component.
-   The truncation is based on the number of characters and allows limiting React components children length (string), even if the top children are not a string (this allows, for example, the input "text" to be a react code instead of requiring it to be a plain string).

### Important

The truncation is done traversing the children of the `ReadMore` component from top to bottom, from start to end, traversing the children of those components until reaching the leaves, that can be either strings or components without children.

This means that the text can be scattered across several components, but must be in the children property of those components (and not in a custom property like `text` or something else).

---

**IMPORTANT**

All descendants that generate text to be displayed should be able to be reached traversing only the `children` props of the descendants of the `ReadMore` component.

---

The descendants of the `ReadMore` component can have other props other than `children` as long as they don't display text.

### Install

    npm install react-shorten

### Quickstart

The next examples will use the following styled `ReadMore` web component:

```tsx
import { ReadMoreWeb } from 'react-shorten';
import React from 'react';

const StyledReadMore: React.FC<{
    truncate?: number;
    children: React.ReactNode;
}> = ({ truncate, children }) => (
    <ReadMoreWeb
        truncate={truncate}
        showMoreText="Show more"
        showLessText="Show less"
        className="read-more-btn"
    >
        {children}
    </ReadMoreWeb>
);
```

and the following css:

```css
.read-more-btn {
    display: inline;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    color: rgb(80, 154, 223);
    background: none;
    border: none;
    cursor: pointer;
}

.link {
    color: rgb(26, 210, 243);
}
```

-   **Small Text:** when the text has less characters than the limit required to truncate, the entire text is shown.

```tsx
const SmallText = () => (
    <StyledReadMore truncate={110}>Lorem ipsum dolor sit amet.</StyledReadMore>
);
```

-   **Large Text:** when the text has more characters than the limit required to truncate, the text is truncated, showing an ellipsis after where it was truncated (this is defined in the `ReadMoreWeb` component, but can be done differently if using the `ReadMore` base component directly), and a `Show more` button styled as a text that expands the text when clicked. After the text is expanded, it shows a `Show less` button to collapse the text again.

```tsx
const LargeText = () => (
    <StyledReadMore truncate={110}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        ullamcorper, odio eu aliquam ultricies, enim sapien aliquet arcu, quis
        aliquam diam massa eu nisl. Sed vitae nunc eget nunc ullamcorper
        aliquet. Sed euismod, nisl eget aliquam ultricies, justo nisl aliquet
        nunc, quis aliquam diam massa eu nisl. Sed vitae nunc eget nunc
        ullamcorper aliquet. Sed euismod, nisl eget aliquam ultricies, justo
        nisl aliquet nunc, quis aliquam diam massa eu nisl. Sed vitae nunc eget
        nunc ullamcorper aliquet. Sed euismod, nisl eget aliquam ultricies,
        justo nisl aliquet nunc, quis aliquam diam massa eu nisl. Sed vitae nunc
        eget nunc ullamcorper aliquet. Sed euismod, nisl eget aliquam ultricies,
        justo nisl aliquet nunc, quis aliquam diam massa eu nisl. Sed vitae nunc
        eget nunc ullamcorper aliquet. Sed euismod, nisl eget aliquam ultricies,
        justo nisl aliquet nunc, quis aliquam diam massa eu nisl. Sed vitae nunc
        eget nunc ullamcorper aliquet. Sed euismod, nisl eget aliquam ultricies,
        justo nisl aliquet nunc, quis aliquam diam massa eu nisl. Sed vitae nunc
        eget nunc ullamcorper aliquet. Sed euismod, nisl eget aliquam ultricies,
        justo nisl aliquet nunc, quis aliquam diam massa eu nisl. Sed vitae nunc
        eget nunc ullamcorper aliquet. Sed euismod, nisl eget aliquam ultricies,
        justo nisl aliquet nunc, quis aliquam diam massa eu nisl. Sed vitae nunc
        eget nunc ullamcorper aliquet. Sed euismod, nisl eget aliquam ultricies,
        justo nisl aliquet nunc, quis aliquam diam massa eu nisl.
    </StyledReadMore>
);
```

-   **Text with HTML (pure react code):** when the text has HTML, the printed text is truncated correctly at the point in which it would exceed the limit defined, even if it's not a direct child of the `ReadMore` component (as long as the entire text can be reached through the `children` property of the descendants of the `ReadMore` component).

```tsx
const HtmlText = () => (
    <StyledReadMore truncate={110}>
        Lorem ipsum dolor sit amet,{' '}
        <i>
            <u>
                consectetur adipiscing elit. Sed ullamcorper, odio eu aliquam
                ultricies, enim sapien aliquet arcu, quis aliquam diam massa eu
                nisl. Sed vitae nunc eget nunc ullamcorper aliquet.
            </u>
        </i>{' '}
        Sed euismod, nisl eget aliquam ultricies, justo nisl aliquet nunc, quis
        aliquam diam massa eu nisl. Sed vitae nunc eget nunc ullamcorper
        aliquet.
    </StyledReadMore>
);
```

-   **Text with links (pure react code):** when the text has a link (anchor), it will work the same way as any other HTML defined as the text/children to be truncated (it's a specific case of the previous example).

```tsx
const LinkText = () => (
    <StyledReadMore truncate={110}>
        Lorem ipsum dolor sit amet,{' '}
        <a href="http://localhost:3000" className="link">
            consectetur adipiscing elit. Sed ullamcorper, odio eu aliquam
            ultricies, enim sapien aliquet arcu, quis aliquam diam massa eu
            nisl. Sed vitae nunc eget nunc ullamcorper aliquet.
        </a>{' '}
        Sed euismod, nisl eget aliquam ultricies, justo nisl aliquet nunc, quis
        aliquam diam massa eu nisl. Sed vitae nunc eget nunc ullamcorper
        aliquet.
    </StyledReadMore>
);
```

### Custom Web ReadMore Component

You can create a custom web component, instead of using the one provided by this library, if you want more customization.

You only need to make sure to handle the `expanded` state (this can be done in a simple `useState`) and (optionally, but recommended) buttons to show more and less content.

The following code is the implementation of the `ReadMoreWeb` component of this library. It can be used as a reference when implementing a custom component:

```tsx
import { ReadMore } from 'react-shorten';
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
                    <button
                        onClick={onShowMore}
                        className={className}
                        style={style}
                    >
                        {showMoreText ?? 'Show more'}
                    </button>
                </>
            }
            showLess={
                <>
                    {' '}
                    <button
                        onClick={onShowLess}
                        className={className}
                        style={style}
                    >
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
```

### Native ReadMore Component

This library does not provides a native component (so as to not have react-native as a dependency), but it can be easily created just like the web/html example above, just changing the buttons to native components like `Pressable` (or even `Text`) with `onPress` or another press/tap event handler of your preference.

### Demo

You can see a live web (react-dom) demo [here](https://lucasbasquerotto.github.io/react-read-more).
