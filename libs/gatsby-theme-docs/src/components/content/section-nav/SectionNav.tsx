import Typography from '@mui/material/Typography';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import Slugger from 'github-slugger';
import { array, InferProps, node, object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';
import * as striptags from 'striptags';
import { classes, List, ListItem } from './styles';

function handleHeadingClick(event) {
  // Lets track that custom click
  trackCustomEvent({
    // string - required - The object that was interacted with (e.g.video)
    category: 'Section Nav',
    // string - required - Type of interaction (e.g. 'play')
    action: 'heading click',
    // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
    label: event.target.innerText,
  });
}

const SectionNavItem = (props: InferProps<typeof SectionNavItem.propTypes>) => {
  const { children } = props;

  return <ListItem className={classes.listItemRoot}>{children}</ListItem>;
};

SectionNavItem.propTypes = {
  children: node,
};

export const SectionNav = (props: InferProps<typeof SectionNav.propTypes>) => {
  const { contentRef } = props;
  const { y } = useWindowScroll();
  const { width, height } = useWindowSize();
  const [offsets, setOffsets] = useState([]);

  useEffect(() => {
    const headings: HTMLElement[] = contentRef.current.querySelectorAll(
      'h1, h2'
    );

    setOffsets(
      Array.from(headings)
        .map((heading) => {
          const anchor = heading.querySelector('a');

          if (!anchor) {
            return null;
          }

          return {
            id: heading.id,
            offset: heading.offsetTop + anchor.offsetTop,
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
  let lastDepth = 0;

  return (
    <List className={classes.listRoot}>
      {props.headings.map(({ value, depth }) => {
        const text = striptags(value);
        const slug = slugger.slug(text);

        const newSection = lastDepth > 2 && depth === 2;

        lastDepth = depth;

        return (
          <SectionNavItem
            depth={depth}
            newSection={newSection}
            key={slug}
            active={slug === activeHeading}
          >
            <a href={`#${slug}`} onClick={handleHeadingClick}>
              <Typography variant="caption">{text}</Typography>
            </a>
          </SectionNavItem>
        );
      })}
    </List>
  );
};

SectionNav.propTypes = {
  headings: array.isRequired,
  contentRef: object.isRequired,
};

export default SectionNav;
