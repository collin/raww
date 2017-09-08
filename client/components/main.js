import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Footer from './footer';
import Navbar from './navbar';
import { removeError } from '../store';

const styles = {
  leftGroup: {
    display: 'flex',
  },
  close: {
    borderLeft: '0.1rem solid',
  },
  warning: {
    borderRight: '0.1rem solid',
  },
  alert_item: {
    padding: '1rem',
    display: 'flex',
  },
  alert_container: {
    width: '100%',
    zIndex: 2002,
    backgroundColor: 'white',
    position: 'fixed',
    boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
    borderRadius: '.28571429rem',
    minHeight: '4.15714286em',
    display: 'flex',
    fontWeight: 400,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alert: {

  },
  alert_mask: {
    position: 'fixed',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1001,
    width: '100%',
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  footer: {
    height: '3em',
    marginTop: 'auto',
  },
};

const Main = (props) => {
  const { children, isLoggedIn, error, handleRemoveError } = props;

  return (
    <div style={styles.container}>
      {
        error ?
          <div>
            <div>
              <div style={styles.alert_container}>
                <div style={styles.leftGroup} >
                  <div style={Object.assign({}, styles.alert_item, styles.warning)}><Icon name="warning sign" />Error</div>
                  <div style={styles.alert_item}>{error.message}</div>
                </div>
                <div style={Object.assign({}, styles.alert_item, styles.close)} onClick={() => handleRemoveError()}><Icon name="delete" />Close</div>
              </div>
              <div style={styles.alert_mask} />
            </div>
          </div> : null
      }
      <div>
        {isLoggedIn ?
          <Navbar location={props.location}/> : null}
      </div>
      <div>
        {children}
      </div>
      <div style={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    error: state.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleRemoveError: () => {
      dispatch(removeError());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Main));

Main.propTypes = {
  children: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.object,
  location: PropTypes.string,
  handleRemoveError: PropTypes.func.isRequired,
};

