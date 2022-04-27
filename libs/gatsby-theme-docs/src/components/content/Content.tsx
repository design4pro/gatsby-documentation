import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import { InferProps, node, object } from 'prop-types';
import React, { Fragment, useRef } from 'react';
import TimeAgo from 'react-timeago';
import { useMount } from 'react-use';
import CollapseOnScroll from '../ui/CollapseOnScroll';
import { ToolbarOffset } from '../ui/global.styles';
import Link from '../ui/Link';
import ContentHeader from './content-header';
import ContentNav from './content-nav/ContentNav';
import SectionNav from './section-nav';
import { classes, Root } from './styles';

const Content = (props: InferProps<typeof Content.propTypes>) => {
  const {
    children,
    data: {
      mdx,
      site: {
        siteMetadata: { docsLocation },
      },
    },
  } = props;
  const contentRef = useRef(null);

  useMount(() => {
    if (props.hash) {
      // turn numbers at the beginning of the hash to unicode
      // see https://stackoverflow.com/a/20306237/8190832
      const hash = props.hash.toLowerCase().replace(/^#(\d)/, '#\\3$1 ');

      try {
        const hashElement = contentRef.current.querySelector(hash);

        if (hashElement) {
          hashElement.scrollIntoView();
        }
      } catch (error) {
        // let errors pass
      }
    }
  });

  return (
    <Root className={classes.root}>
      <main className={classes.mainContent}>
        <ToolbarOffset></ToolbarOffset>
        <ContentHeader {...mdx} />
        <div ref={contentRef}>
          <h1>{mdx.title}</h1>

          <div>{children}</div>
          <div className={classes.contentFooter}>
            <ContentNav {...props} />
          </div>
          <div className={classes.contentFooterData}>
            Last updated <TimeAgo date={mdx.fields.gitModifiedTime} />
          </div>
        </div>
      </main>
      <aside className={classes.aside}>
        <CollapseOnScroll threshold={1} disableHysteresis={true}>
          <ToolbarOffset></ToolbarOffset>
        </CollapseOnScroll>
        {mdx.parent.relativePath && (
          <div className={classes.edit}>
            <Link
              to={`${docsLocation}/${mdx.parent.relativePath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon /> Edit on GitHub
            </Link>
          </div>
        )}
        {mdx.headings.length > 1 && (
          <Fragment>
            <h4 className={classes.asideHeading}>
              <Typography variant="overline">{mdx.fields.title}</Typography>
            </h4>
            <SectionNav headings={mdx.headings} contentRef={contentRef} />
          </Fragment>
        )}
      </aside>
    </Root>
  );
};

Content.propTypes = {
  children: node,
  data: object,
};

export default Content;
