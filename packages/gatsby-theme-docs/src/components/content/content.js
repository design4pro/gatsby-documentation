import Typography from '@material-ui/core/Typography';
import CollapseOnScroll from 'components/ui/collapse-on-scroll';
import { ToolbarOffset } from 'components/ui/global';
import { Link } from 'components/ui/link';
import React, { useRef } from 'react';
import useMount from 'react-use/lib/useMount';
import ContentHeader from './content-header';
import {
    Aside,
    AsideHeading,
    BodyContent,
    Container,
    MainContent
} from './content.styles';
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
        <Container>
            <MainContent>
                <ToolbarOffset />
                <ContentHeader {...mdx} />
                <hr />
                <BodyContent ref={contentRef}>
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
                </BodyContent>
            </MainContent>
            <Aside>
                <CollapseOnScroll threshold={1} disableHysteresis={true}>
                    <ToolbarOffset />
                </CollapseOnScroll>
                <AsideHeading>
                    <Typography variant="overline">
                        {mdx.fields.title}
                    </Typography>
                </AsideHeading>
                {mdx.headings.length > 0 && (
                    <SectionNav
                        headings={mdx.headings}
                        contentRef={contentRef}
                    />
                )}
            </Aside>
        </Container>
    );
};

export default Content;
