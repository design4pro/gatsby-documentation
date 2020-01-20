import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import Slugger from 'github-slugger';
import { array, object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import useScroll from 'react-use/lib/useScroll';
import useWindowSize from 'react-use/lib/useWindowSize';
import striptags from 'striptags';
import { StyledList, StyledListItem } from './section-nav.styles';

function handleHeadingClick(event) {
    // To stop the page reloading
    event.preventDefault();
    // Lets track that custom click
    trackCustomEvent({
        // string - required - The object that was interacted with (e.g.video)
        category: 'Section Nav',
        // string - required - Type of interaction (e.g. 'play')
        action: 'heading click',
        // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
        label: event.target.innerText
    });
}

export const SectionNav = props => {
    const { y } = useScroll(props.mainRef);
    const { width, height } = useWindowSize();
    const [offsets, setOffsets] = useState([]);

    const { contentRef } = props;

    useEffect(() => {
        const headings = contentRef.current.querySelectorAll('h1, h2');

        setOffsets(
            Array.from(headings)
                .map(heading => {
                    const anchor = heading.querySelector('a');

                    if (!anchor) {
                        return null;
                    }

                    return {
                        id: heading.id,
                        offset: anchor.offsetTop
                    };
                })
                .filter(Boolean)
        );
    }, [width, height, contentRef]);

    let activeHeading = null;
    const windowOffset = height / 2;
    const scrollTop = y + windowOffset;

    for (let i = offsets.length - 1; i >= 0; i--) {
        const { id, offset } = offsets[i];

        if (scrollTop >= offset) {
            activeHeading = id;
            break;
        }
    }

    const slugger = new Slugger();
    let lastDepth = false;

    return (
        <StyledList>
            {props.headings.map(({ value, depth }) => {
                const text = striptags(value);
                const slug = slugger.slug(text);

                let newSection = lastDepth > 2 && depth === 2;

                lastDepth = depth;

                return (
                    <StyledListItem
                        depth={depth}
                        newSection={newSection}
                        key={slug}
                        active={slug === activeHeading}
                    >
                        <a href={`#${slug}`} onClick={handleHeadingClick}>
                            {text}
                        </a>
                    </StyledListItem>
                );
            })}
        </StyledList>
    );
};

SectionNav.propTypes = {
    headings: array.isRequired,
    mainRef: object.isRequired,
    contentRef: object.isRequired
};

export default SectionNav;
