import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Field, Form, Formik } from 'formik';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Fragment, KeyboardEvent, MouseEvent, useState } from 'react';
import { useFlexSearch } from 'react-use-flexsearch';
import { Link } from '../../ui';
import { classes, Root } from './styles';

export const SearchBar = () => {
  const [query, setQuery] = useState(null);
  const [open, setOpen] = useState(false);
  const {
    localSearchPages: { index, store },
  } = useStaticQuery(
    graphql`
      query SearchQuery {
        localSearchPages {
          index
          store
        }
      }
    `
  );
  const results = useFlexSearch(query, index, store);

  const toggleDrawer = (open: boolean) => (
    event: KeyboardEvent | MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <Root>
      <div className={classes.inputWrapper} onClick={toggleDrawer(true)}>
        <div className={classes.inputContainer}>
          <label>
            <input type="text" name="query" placeholder="Search..." />
            <button type="submit" className={'searchIcon'}>
              <SearchIcon />
            </button>
          </label>
        </div>
      </div>
      <Drawer
        className={classes.listDrawer}
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <div className={classes.list} role="presentation">
          <div className={classes.listToolbar}>
            <Formik
              initialValues={{ query: '' }}
              onSubmit={(values, { setSubmitting }) => {
                setQuery(values.query);
                setSubmitting(false);
              }}
            >
              {({ values, setFieldValue }) => {
                return (
                  <Form className={classes.inputContainer}>
                    <label>
                      <Field
                        type="text"
                        name="query"
                        placeholder="Search..."
                        innerRef={(input: React.HTMLElement<any>) =>
                          input && input.focus()
                        }
                        onChange={(e: React.ChangeEvent<any>) => {
                          setQuery(e.target.value);
                          setFieldValue('query', e.target.value, false);
                        }}
                      />
                      <button type="submit" className={'searchIcon'}>
                        <SearchIcon />
                      </button>
                      {values.query ? (
                        <button
                          type="reset"
                          className={'clearIcon'}
                          onClick={() => {
                            setQuery('');
                            setFieldValue('query', '', false);
                          }}
                        >
                          <ClearIcon />
                        </button>
                      ) : null}
                      <button onClick={toggleDrawer(false)}>
                        <ArrowForwardIcon />
                      </button>
                    </label>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <List className={classes.resultList}>
            {results.map((result) => (
              <Link
                className={classes.resultLink}
                key={result.id}
                to={result.slug}
              >
                <ListItem
                  className={classes.resultListItem}
                  alignItems="flex-start"
                >
                  <ListItemText
                    primary={result.title}
                    secondary={
                      <Fragment>
                        {/* <Typography
                          component="span"
                          variant="body2"
                          className={classes.resultInline}
                          color="textPrimary"
                        >
                          to Scott, Alex, Jennifer
                        </Typography>
                        {" — Wish I could come, but I'm out of town this…"} */}
                      </Fragment>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    </Root>
  );
};

export default SearchBar;
