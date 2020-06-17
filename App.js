import React from 'react';
import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList'
class App extends React.Component {
    state = {
      videos: [],
      selectedVideo: null,
    }

    componentDidMount() {
      this.handleSubmit('pdf generation with react and node')
    }
    handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
      part:'snippet',
      maxResults:5,
      key:'AIzaSyBjoDBK5vq2_4GO4BUYy3YxBoE4SNZPPBs',
      q: searchTerm,
  }
  });
    console.log(response);
    this.setState({videos: response.data.items, selectedVideo: response.data.items[0]});
  }
  onVideoSelect = (video) => {
    this.setState({selectedVideo: video});
  }
  render() {
    return(
      <Grid style={{justifyContent:"center"}} container spacing={10}>
        <Grid item xs={11}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
                <SearchBar onFormSubmit={this.handleSubmit}/>
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={this.state.selectedVideo}/>
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default App;