import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
    heading: {
        '&:not(:last-child)': {
            marginBottom: 8
        }
    }
}));
