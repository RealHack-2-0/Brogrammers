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
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';

const problem1 = {
  id: 'sbdvi',
  title: 'Dropbox',
  description:
    'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
  imageUrl: '/images/products/product_1.png',
  totalDownloads: '594',
  updatedAt: '27/03/2019'
};
const problem = {
  post_id: '',
  user_id: '',
  topic: 'title',
  content: 'This is content',
  date: '2019/11/11'
};
// const useStyles = makeStyles(theme => ({

// }));
const user = JSON.parse(localStorage.getItem('user'));
class Question extends React.Component {
  state = {
    topic: '',
    content: '',
    tags: [],
    answer: '',
    post_id: '',
    user_id: user[0].user_id,
    answers: [],
    votes:0,
  };

  componentDidMount() {
    this.fetchQuestion(this.props.match.params.id);
    this.fetchVotes(this.props.match.params.id);
  }
  handleChange = event => {
    this.setState({
      answer: event.target.value
    });
  };

  fetchVotes = id => {
    fetch('http://172.16.41.11:3000/votes/' + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(r => {
        console.log("votes",r);
        if(r.success){
          this.setState({
            votes:r.data[0].vote1
          })
        }
      });
  };
  fetchQuestion = id => {
    fetch('http://172.16.41.11:3000/question/' + id, {
      method: 'GET',
      // mode:"no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
      // body: JSON.stringify(formState.values)
    })
      .then(res => res.json())
      .then(r => {
        if (r.data[0]) {
          console.log(r.data[0]);

          this.setState({
            topic: r.data[0].topic,
            content: r.data[0].content,
            date: r.data[0].date,
            post_id: r.data[0].post_id
          });
          this.fetchAnswers(this.props.match.params.id);
        }
      });
  };
  fetchAnswers = id => {
    console.log('answer', id);
    fetch('http://172.16.41.11:3000/answer/' + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(r => {
        console.log(r);
        this.setState({
          answers: r.data
        });
      })
      .catch(err => console.log(err));

    console.log('answer2');
  };
  //answer_is
  //post_id,
  //description
  //user_id

  postAnswer = () => {
    console.log({
      post_id: this.state.post_id,
      user_id: this.state.user_id,
      description: this.state.answer
    });
    fetch('http://172.16.41.11:3000/answer/', {
      method: 'POST',
      // mode:"no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post_id: this.state.post_id,
        user_id: this.state.user_id,
        description: this.state.answer
      })
    })
      .then(res => res.json())
      .then(r => {
        console.log(r);
        if (r.success) {
          this.setState({
            answer: ''
          });
          this.fetchAnswers(this.props.match.params.id);
        }
      });
  };
  classes = {
    root: {
      margin: 50
    },
    details: {
      display: 'flex'
    },
    uploadButton: {
      marginRight: 10
    }
  };

  vote = (vot)=>{
    console.log({
      post_id: this.state.post_id,
      user_id: this.state.user_id,
      vote: vot
    });

    fetch('http://172.16.41.11:3000/votes/vote', {
      method: 'POST',
      // mode:"no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post_id: parseInt(this.state.post_id),
        user_id: parseInt(this.state.user_id),
        vote: parseInt(vot)
      })
    })
      .then(res => res.json()).then(r=>{ 
        console.log(r);
        this.fetchVotes(this.props.match.params.id)
      })
  }
  render() {
    const problem = this.state;
    return (
      <div>
        <Card style={this.classes.root}>
          <CardContent>
            <div className={this.classes.imageContainer}>
              {/* <img
              alt="problem"
              className={classes.image}
              src={problem.imageUrl}
              width={30}
            /> */}
            </div>
            <Typography align="center" gutterBottom variant="h4">
              {problem.topic}
            </Typography>
            <Typography align="center" variant="body1">
              {problem.content}
            </Typography>
          </CardContent>
          <Divider />
          <Divider />
          <CardActions>
            <Grid container justify="space-between">
              <Grid className={this.classes.statsItem} item xs={7}>
                <AccessTimeIcon className={this.classes.statsIcon} />
                <Typography display="inline" variant="body2">
                  Asked {moment(problem.date).format('DD/MM/YYYY')}
                </Typography>
              </Grid>
              <Grid item>
              <Typography variant="h1" xs={1}>
                  {this.state.votes}
                </Typography>
              </Grid>
              <Grid className={this.classes.statsItem} item xs={4}>
                
                <Button variant="contained" color="primary" onClick={()=>this.vote(1)}>
                  <span>
                    <ThumbUp className={this.classes.statsIcon} />{' '}
                  </span>{' '}
                  Up vote
                </Button>
                <Button onClick={()=>this.vote(-1)}>
                  <span>
                    <ThumbDown className={this.classes.statsIcon} />{' '}
                  </span>
                  Down vote
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
        <Card style={this.classes.root}>
          {this.state.answers.map((ele, index) => {
            return (
              <div key={index}>
                <Divider />

                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={8}>
                      <Typography
                        className={this.classes.locationText}
                        color="textSecondary"
                        variant="h5">
                        {ele.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        className={this.classes.locationText}
                        color="textSecondary"
                        variant="body1">
                        {ele.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
              </div>
            );
          })}

          <CardContent>
            <TextField
              fullWidth
              helperText="Provide your answer"
              label="Answer"
              margin="dense"
              name="answer"
              onChange={this.handleChange}
              required
              value={this.state.answer}
              variant="outlined"
              multiline
              rows={4}
            />
          </CardContent>
          <CardActions>
            <Button
              className={this.classes.uploadButton}
              color="primary"
              variant="text"
              onClick={this.postAnswer}>
              Answer
            </Button>
            <Button
              variant="text"
              onClick={() => {
                this.setState({
                  answer: ''
                });
              }}>
              Clear Fields
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Question;
