import React, { Component } from 'react';
import api from '../services/Api';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

export default class pages extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('New')} >
        <Image source={camera} />
      </TouchableOpacity>
    ),
  });

  state = {
    feed: []
  };
  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get('posts');
    this.setState({ feed: response.data });
  }

  //comandos para aplicacao rodar em tempo real
  registerToSocket = () => {
    const socket = io('10.10.252.168');

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    })

    socket.on('like', newLike => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === newLike._id ? newLike : post
        )
      });
    })

  }

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>
              <View style={styles.feedItemHeader}>
                <Image style={styles.perfil} source={{ uri: `http://10.10.252.168:3001/files/${item.image}` }} />
                <View style={styles.userInfor}>
                  <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>
                <TouchableOpacity style={styles.more} onPress={() => { }}>
                  <Image source={more} />
                </TouchableOpacity>
              </View>
              <Image style={styles.feedImage} source={{ uri: `http://10.10.252.168:3001/files/${item.image}` }}
              />
              <View style={styles.footer}>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.action} onPress={() => this.handleLike(item._id)}>
                    <Image source={like} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => { }}>
                    <Image source={comment} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => { }}>
                    <Image source={send} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.likes}>{item.likes} curtidas</Text>
                <Text style={styles.hashtags}>{item.hashtags}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  feedItem: {
    marginTop: 20
  },
  feed: {
    marginTop: 20
  },
  feedItemHeader: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  name: {
    marginLeft: -140,
    fontSize: 16,
    color: '#000',
  },
  place: {
    marginLeft: -140,
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15,
  },
  userInfor: {

  },
  footer: {
    paddingHorizontal: 15,
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    marginRight: 10
  },
  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    lineHeight: 18,
    color: '#000',
  },
  hashtags: {
    color: '#7159c1',
  },
  perfil: {
    width: 45,
    height: 45,
    borderRadius: 25
  },
  more: {
    marginLeft: -40,
    height: 30,
    width: 30,
    // backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center'
  }
})