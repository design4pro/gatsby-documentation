import Typography from '@material-ui/core/Typography';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import Slugger from 'github-slugger';
import { array, InferProps, node, object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import useWindowScroll from 'react-use/lib/useWindowScroll';
import useWindowSize from 'react-use/lib/useWindowSize';
import striptags from 'striptags';
import useStyles from './styles';

function handleHeadingClick(event) {
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

const SectionNavItem = (props: InferProps<typeof SectionNavItem.propTypes>) => {
  const { children } = props;
  const classes = useStyles(props);

  return <div className={classes.listItem}>{children}</div>;
};

SectionNavItem.propTypes = {
  children: node
};

export const SectionNav = (props: InferProps<typeof SectionNav.propTypes>) => {
  const { contentRef } = props;
  const { y } = useWindowScroll();
  const { width, height } = useWindowSize();
  const [offsets, setOffsets] = useState([]);
  const classes = useStyles();

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
            offset: heading.offsetTop + anchor.offsetTop
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
    <div className={classes.list}>
      {props.headings.map(({ value, depth }) => {
        const text = striptags(value);
        const slug = slugger.slug(text);

        let newSection = lastDepth > 2 && depth === 2;

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
    </div>
  );
};

SectionNav.propTypes = {
  headings: array.isRequired,
  contentRef: object.isRequired
};

export default SectionNav;
