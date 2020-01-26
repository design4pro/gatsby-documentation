import { shape, string } from 'prop-types';
import React from 'react';
import { Heading, Subheading } from './content-header.styles';

export const ContentHeader = props => {
    const {
        fields: { title, description }
    } = props;

    return (
        <div className="header-wrapper">
            <Heading>{title}</Heading>
            {description && <Subheading>{description}</Subheading>}
        </div>
    );
};

ContentHeader.propTypes = {
    fields: shape({
        title: string.isRequired,
        description: string
    })
};

export default ContentHeader;
