import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActions,
  Button,
  Divider,
  TextField,
  Snackbar,
  Paper,
  Chip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import moment from 'moment';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 50
  },
  details: {
    display: 'flex'
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  tagroot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));
const PostProblem = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [values, setValues] = useState({
    title: '',
    description: '',
    tags: [],
    open: false,
    vertical: 'top',
    horizontal: 'right'
  });

  const [chipData, setChipData] = React.useState([
    
  ]);
  const handleDelete = chipToDelete => () => {
    if (chipToDelete.label === 'React') {
      alert('Why would you want to delete React?! :)');
      return;
    }

    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleClick = msg => {
    console.log(msg);
    setValues({ ...values, open: true, msg: msg[1], variant: msg[0] });
  };

  const handleClose = () => {
    setValues({ ...values, open: false });
  };

  const postQuestion = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    fetch('http://172.16.41.11:3000/question', {
      method: 'POST',
      // mode:"no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user[0].user_id,
        topic: values.topic,
        content: values.content,
        date: today
      })
    })
      .then(res => res.json())
      .then(r => {
        if (r.success) {
          handleClick(['success', 'Successfully posted']);
        } else {
          if (r.message === 'BAD_WORDS') {
            handleClick(['error', 'Offensive word are not tolerated']);
          }
        }
      });
  };

  const addTag = e => {
    if (e.keyCode == 13) {
      console.log(e.target.value);
      console.log(chipData);

      setChipData([
        ...chipData,
        { key: chipData.length, label: e.target.value }
      ]);
      setValues({
        ...values,
        currentTag: ''
      });
    } 
  };
  const onChange = (e)=>{
    setValues({
      ...values,
      currentTag: e.target.value
    });
  }
  const classes = useStyles();

  const { vertical, horizontal, open } = values;
  console.log(values);
  return (
    <Card className={clsx(classes.root)}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={values.open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{values.msg}</span>}></Snackbar>
      <CardContent>
        <div>
          <Typography
            className={classes.locationText}
            color="textSecondary"
            variant="body1"></Typography>
          <TextField
            fullWidth
            helperText="Suggest a title to your question"
            label="Title"
            margin="dense"
            name="topic"
            onChange={handleChange}
            required
            value={values.topic}
            variant="outlined"
          />
        </div>
      </CardContent>
      <Divider />
      <CardContent>
        <TextField
          fullWidth
          helperText="Please specify the first name"
          label="Description"
          margin="dense"
          name="content"
          onChange={handleChange}
          required
          value={values.content}
          variant="outlined"
          multiline
          rows={10}
        />
      </CardContent>
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={postQuestion}>
          Ask Question
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setValues({ title: '', description: '' });
          }}>
          Clear Fields
        </Button>
      </CardActions>
      <div>
        <Paper className={classes.root}>
          {chipData.map(data => {
            let icon;

            if (data.label === 'React') {
              icon = <TagFacesIcon />;
            }

            return (
              <Chip
                key={data.key}
                icon={icon}
                label={data.label}
                onDelete={handleDelete(data)}
                className={classes.chip}
              />
            );
          })}
          <TextField
            fullWidth
            helperText="Tags"
            label="Add your tags here"
            margin="dense"
            name="tag"
            onKeyDown={addTag}
            onChange={onChange}
            required
            value={values.currentTag}
            variant="outlined"
            rows={1}
          />
        </Paper>
      </div>
    </Card>
  );
};

export default PostProblem;
