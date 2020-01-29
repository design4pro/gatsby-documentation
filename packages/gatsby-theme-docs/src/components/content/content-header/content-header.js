import { shape, string } from 'prop-types';
import React from 'react';
import useStyles from './content-header.styles';

export const ContentHeader = props => {
    const {
        fields: { title, description }
    } = props;
    const classes = useStyles();

    return (
        <div className="header-wrapper">
            <h1 className={classes.heading}>{title}</h1>
            {description && <h3>{description}</h3>}
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
