import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default class WebViewPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('repository').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  render() {
    const repository = this.props.navigation.getParam('repository');

    return <WebView source={{uri: repository.html_url}} style={{flex: 1}} />;
  }
}
