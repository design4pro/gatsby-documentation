import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { InferProps } from 'prop-types';
import React from 'react';
import { Link } from '../../ui';
import useStyles from './styles';

export const ContentNav = (props: InferProps<typeof ContentNav.propTypes>) => {
  const {
    pageContext: { previous, next }
  } = props;
  const classes = useStyles();

  const isPrevious = () => previous && previous.node.fields.slug !== '';
  const isNext = () => next && next.node.fields.slug !== '';

  return (
    <div className={classes.root}>
      {isPrevious() ? (
        <Card
          className={`${classes.card} ${classes.cardPrevious}`}
          elevation={0}
        >
          <Link
            className={classes.cardLink}
            to={previous.node.fields.slug}
            color="textSecondary"
            underline="none"
          >
            <CardActionArea>
              <CardContent>
                <div className={classes.cardContent}>
                  <ArrowBackIcon />
                  <div className={classes.cardContentBodyPrevious}>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Previous
                    </Typography>
                    <Typography
                      className={classes.cardContentBodyTitle}
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    >
                      {previous.node.fields.title}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      ) : null}
      {isNext() ? (
        <Card className={`${classes.card} ${classes.cardNext}`} elevation={0}>
          <Link
            className={classes.cardLink}
            to={next.node.fields.slug}
            color="textSecondary"
            underline="none"
          >
            <CardActionArea>
              <CardContent>
                <div className={classes.cardContent}>
                  <div className={classes.cardContentBodyNext}>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Next
                    </Typography>
                    <Typography
                      className={classes.cardContentBodyTitle}
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    >
                      {next.node.fields.title}
                    </Typography>
                  </div>
                  <ArrowForwardIcon />
                </div>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      ) : null}
    </div>
  );
};

ContentNav.propTypes = {};

export default ContentNav;
