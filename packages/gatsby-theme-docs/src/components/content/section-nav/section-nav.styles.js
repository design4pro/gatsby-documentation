import { makeStyles, styled } from '@material-ui/styles';
import React from 'react';

export const StyledList = styled('ul')({
    marginLeft: 0,
    marginBottom: 48,
    overflow: 'auto'
});

export const StyledListItem = ({ children, ...props }) => {
    const classes = makeStyles({
        root: {
            listStyle: 'none',
            fontSize: '1rem',
            color: props.active && '#000',
            marginTop: props.newSection ? `1rem` : false,
            '& a': {
                color: 'inherit',
                textDecoration: 'none',
                paddingLeft: props.depth > 2 ? `${props.depth - 2}rem` : 0,
                '&:hover': {
                    // opacity: colors.hoverOpacity
                }
            }
        }
    })(props);

    return <li className={classes.root}>{children}</li>;
};
