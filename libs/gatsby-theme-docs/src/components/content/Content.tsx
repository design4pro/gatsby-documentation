import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import { InferProps, node, object } from 'prop-types';
import React, { Fragment, useRef } from 'react';
import TimeAgo from 'react-timeago';
import useMount from 'react-use/lib/useMount';
import CollapseOnScroll from '../ui/CollapseOnScroll';
import useGlobalStyles from '../ui/global.styles';
import Link from '../ui/Link';
import ContentHeader from './content-header';
import ContentNav from './content-nav/ContentNav';
import SectionNav from './section-nav';
import useStyles from './styles';

const Content = (props: InferProps<typeof Content.propTypes>) => {
  const {
    children,
    data: {
      mdx,
      site: {
        siteMetadata: { docsLocation }
      }
    }
  } = props;
  const contentRef = useRef(null);
  const classes = useStyles();
  const globalClasses = useGlobalStyles();

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
    <div className={classes.container}>
      <main className={classes.mainContent}>
        <div className={globalClasses.toolbarOffset}></div>
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
          <div className={globalClasses.toolbarOffset}></div>
        </CollapseOnScroll>
        {mdx.headings.length > 1 && (
          <Fragment>
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
            <h4 className={classes.asideHeading}>
              <Typography variant="overline">{mdx.fields.title}</Typography>
            </h4>
            <SectionNav headings={mdx.headings} contentRef={contentRef} />
          </Fragment>
        )}
      </aside>
    </div>
  );
};

Content.propTypes = {
  children: node,
  data: object
};

export default Content;
