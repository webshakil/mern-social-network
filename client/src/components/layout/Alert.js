import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux'; //The connect() function connects a React component to a Redux store.

const Alert = ({ alerts }) =>
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert); 

//The mapStateToProps function is used in the Redux pattern to reflect any updates to the Redux store and merge them into props in your component.
//So, anytime you want to interact to component with redux store whether calling the Action or getting the state you need connect.
