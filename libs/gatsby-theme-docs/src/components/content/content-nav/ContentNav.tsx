import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { InferProps } from 'prop-types';
import React from 'react';
import { Link } from '../../ui';
import { classes, Root } from './styles';

export const ContentNav = (props: InferProps<typeof ContentNav.propTypes>) => {
  const {
    pageContext: { previous, next },
  } = props;

  const isPrevious = () => previous && previous.fields.slug !== '';
  const isNext = () => next && next.fields.slug !== '';

  return (
    <Root className={classes.root}>
      {isPrevious() ? (
        <Card
          className={`${classes.card} ${classes.cardPrevious}`}
          elevation={0}
        >
          <Link
            className={classes.cardLink}
            to={previous.fields.slug}
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
                      {previous.fields.title}
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
            to={next.fields.slug}
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
                      {next.fields.title}
                    </Typography>
                  </div>
                  <ArrowForwardIcon />
                </div>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      ) : null}
    </Root>
  );
};

ContentNav.propTypes = {};

export default ContentNav;
