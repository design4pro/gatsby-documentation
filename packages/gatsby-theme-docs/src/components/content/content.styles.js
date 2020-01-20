import { styled } from '@material-ui/styles';

export const Container = styled('div')({
    display: 'flex',
    alignItems: 'flex-start',
    maxWidth: 1200
});

export const MainContent = styled('main')({
    flexGrow: 1,
    width: 0,
    maxWidth: 750
});

export const BodyContent = styled('div')({});

export const Aside = styled('aside')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: 224,
    marginLeft: 'auto',
    paddingRight: 0,
    position: 'sticky',
    // top: headerheight,
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

export const AsideHeading = styled('h4')({
    fontWeight: 600
});
