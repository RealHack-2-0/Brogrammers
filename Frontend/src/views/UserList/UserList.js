import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';

const useStyles = {
  root: {
    padding: 10
  },
  content: {
    marginTop: 10
  }
};

class UserList extends React.Component {
  state = {
    problems: []
  };
  componentDidMount() {
    fetch('http://172.16.41.11:3000/question', {
      method: 'GET',
      // mode:"no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(r => {
        this.setState({problems:r.data});

      });
  }

  // const classes = useStyles();

  // const [problems,setProblems] = useState([]);

  
    render(){
      return(
      <div style={useStyles.root}>
        <UsersToolbar />
        <div style={useStyles.content}>
          <UsersTable problems={this.state.problems} history={this.props.history} />
        </div>
      </div>
    );
  }
}

export default UserList;
