import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
// import { browserHistory } from 'react-router';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  const { className, problems, ...rest } = props;
  // let history = useHistory();
  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { problems } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = problems.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const openProblem  =(id)=>{
    // window.location.
    props.history.push('/question/'+id);
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell> */}
                  <TableCell style={{flex:1}}>Name</TableCell>
                  {/* <TableCell>Email</TableCell> */}
                  {/* <TableCell>Location</TableCell> */}
                  {/* <TableCell style={{width:150}}>Up Votes</TableCell>
                  <TableCell style={{width:150}}>Down Votes</TableCell> */}
                  <TableCell style={{width:200}}>Asked date</TableCell>
                  <TableCell style={{width:200}}>Answered State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {problems.slice(0, rowsPerPage).map(problem => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={problem.post_id}
                    selected={selectedUsers.indexOf(problem.id) !== -1}
                    onClick={()=>openProblem(problem.post_id)}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user.id)}
                        value="true"
                      />
                    </TableCell> */}
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={problem.avatarUrl}
                        >
                          {getInitials(problem.name)}
                        </Avatar>
                        <Typography variant="body1">{problem.topic}</Typography>
                      </div>
                    </TableCell>
                    {/* <TableCell>{user.email}</TableCell> */}
                    {/* <TableCell>
                      {problem.upvotes}
                    </TableCell>
                    <TableCell>{problem.downvotes}</TableCell> */}
                    <TableCell>
                      {moment(problem.date).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {(problem.answerd===1)? "Answered":"Not Answered"}

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={problems.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
