import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'components/ui/link';
import { bool, func, node, string } from 'prop-types';
import React, { Fragment } from 'react';

export const Category = props => {
    const Icon = props.expanded ? ExpandLessIcon : ExpandMoreIcon;
    const contents = (
        <Fragment>
            <h6>{props.title}</h6>
            <Icon
                style={{
                    visibility: props.onClick ? 'visible' : 'hidden'
                }}
            />
        </Fragment>
    );

    const className = props.active && 'active';

    return (
        <div>
            {!props.onClick && props.path ? (
                <Link className={className} to={props.path}>
                    {contents}
                </Link>
            ) : (
                <button
                    className={className}
                    onClick={
                        props.onClick ? () => props.onClick(props.title) : null
                    }
                >
                    {contents}
                </button>
            )}
            {props.expanded && props.children}
        </div>
    );
};

Category.propTypes = {
    title: string.isRequired,
    path: string,
    expanded: bool.isRequired,
    children: node.isRequired,
    active: bool.isRequired,
    onClick: func
};

export default Category;
