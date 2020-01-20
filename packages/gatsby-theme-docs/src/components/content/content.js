import React, { useRef } from 'react';
import { Link } from '../ui/link';
import {
    Aside,
    AsideHeading,
    BodyContent,
    Container,
    MainContent
} from './content.styles';
import SectionNav from './section-nav';

const Content = props => {
    const contentRef = useRef(null);
    const {
        children,
        mainRef,
        data: {
            mdx,
            site: {
                siteMetadata: { docsLocation }
            }
        }
    } = props;

    return (
        <Container>
            <MainContent>
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
                <AsideHeading>{mdx.title}</AsideHeading>
                {mdx.headings.length > 0 && (
                    <SectionNav
                        headings={mdx.headings}
                        mainRef={mainRef}
                        contentRef={contentRef}
                    />
                )}
            </Aside>
        </Container>
    );
};

export default Content;
