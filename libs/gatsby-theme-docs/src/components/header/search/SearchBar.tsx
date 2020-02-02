import Drawer from '@material-ui/core/Drawer';
import SearchIcon from '@material-ui/icons/Search';
import { Field, Form, Formik } from 'formik';
import { graphql, useStaticQuery } from 'gatsby';
import React, { Fragment, KeyboardEvent, MouseEvent, useState } from 'react';
import { useFlexSearch } from 'react-use-flexsearch';
import useStyles from './styles';

export const SearchBar = () => {
  const classes = useStyles();
  const [query, setQuery] = useState(null);
  const [open, setOpen] = useState(false);
  const {
    localSearchPages: { index, store }
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
  const results = useFlexSearch(query, index, JSON.parse(store));

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
    <Fragment>
      <div className={classes.searchInputWrapper} onClick={toggleDrawer(true)}>
        <div className={classes.inputContainer}>
          <label>
            <input type="text" name="query" placeholder="Search..." />
            <i>
              <SearchIcon />
            </i>
          </label>
        </div>
      </div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div className={classes.list} role="presentation">
          <div
            className={classes.searchInputWrapper}
            onClick={toggleDrawer(true)}
          >
            <Formik
              initialValues={{ query: '' }}
              onSubmit={(values, { setSubmitting }) => {
                setQuery(values.query);
                setSubmitting(false);
              }}
            >
              <Form className={classes.inputContainer}>
                <label>
                  <Field type="text" name="query" placeholder="Search..." />
                  <i>
                    <SearchIcon />
                  </i>
                </label>
              </Form>
            </Formik>
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default SearchBar;
