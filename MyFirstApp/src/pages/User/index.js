import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import Api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class Main extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    page: 2,
    refreshing: false,
  };

  async componentDidMount() {
    this.setState({loading: true});

    const {navigation} = this.props;
    const user = navigation.getParam('user');

    const response = await Api.get(`/users/${user.login}/starred`);

    this.setState({stars: response.data, loading: false});
  }

  loadMore = async nextpage => {
    const {stars} = this.state;
    const user = this.props.navigation.getParam('user');
    try {
      const response = await Api.get(`/users/${user.login}/starred`, {
        params: {page: nextpage},
      });
      console.tron.log(stars);
      nextpage += 1;
      this.setState({
        stars: nextpage >= 2 ? [...stars, ...response.data] : response.data,
        page: nextpage,
        loading: false,
        refreshing: false,
      });
    } catch (error) {
      console.tron.log(error);
    }
  };

  refreshList = async () => {
    this.setState({refreshing: true, stars: []});
    await this.loadMore(1);
  };

  handleNavigate = repository => {
    const {navigation} = this.props;

    navigation.navigate('WebViewPage', {repository});
  };

  render() {
    const {stars, loading, page, refreshing} = this.state;
    const user = this.props.navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <Stars
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={() => this.loadMore(page)}
            data={stars}
            keyExtractor={(_, index) => String(index)}
            renderItem={({item}) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
