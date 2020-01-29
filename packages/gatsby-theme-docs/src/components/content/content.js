import Typography from '@material-ui/core/Typography';
import CollapseOnScroll from 'components/ui/collapse-on-scroll';
import useGlobalStyles from 'components/ui/global.styles';
import { Link } from 'components/ui/link';
import React, { Fragment, useRef } from 'react';
import useMount from 'react-use/lib/useMount';
import ContentHeader from './content-header';
import useStyles from './content.styles';
import SectionNav from './section-nav';

const Content = props => {
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
                <hr />
                <div ref={contentRef}>
                    <h1>{mdx.title}</h1>

                    {mdx.parent.relativePath && (
                        <Link
                            className={'gitBtn'}
                            to={`${docsLocation}/${mdx.parent.relativePath}`}
                        >
                            <img src="" alt={'Github logo'} /> Edit on GitHub
                        </Link>
                    )}

                    <div>{children}</div>
                    <div>{/* <NextPrevious docsPage={mdx} /> */}</div>
                    <pre>{JSON.stringify(props.data, null, 2)}</pre>
                </div>
            </main>
            <aside className={classes.aside}>
                <CollapseOnScroll threshold={1} disableHysteresis={true}>
                    <div className={globalClasses.toolbarOffset}></div>
                </CollapseOnScroll>
                {mdx.headings.length > 1 && (
                    <Fragment>
                        <h4 className={classes.asideHeading}>
                            <Typography variant="overline">
                                {mdx.fields.title}
                            </Typography>
                        </h4>
                        <SectionNav
                            headings={mdx.headings}
                            contentRef={contentRef}
                        />
                    </Fragment>
                )}
            </aside>
        </div>
    );
};

export default Content;
