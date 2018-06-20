/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native'
import ActionSheet from './custom/action-sheet'

import {
  ActionSheetItemContainer,
  ActionSheetItemImageView,
  ActionSheetItemSubContainer,
  ActionSheetTitleView,
  ActionSheetItemTitleView,
  ActionSheetDescriptionView,
  ActionSheetItemImageContainer,
  ActionSheetItemBottomBorderView
} from './custom/styles'

const images = [
  'https://cdn2.iconfinder.com/data/icons/picons-essentials/57/pdf-512.png',
  'https://factba.se/img/icon-trump-t-000.png',
  'http://icon-park.com/imagefiles/link_icon_black.png',
]

const text = [
  {
    title: 'Link zum Artikel teilen',
    description: 'Artikeltext exportieren'
  },
  {
    title: 'Artikeltext exportieren',
    description: 'Exportieren Sie diesen Artikel als Text'
  },
  {
    title: 'Seite als PDF exportieren',
    description: 'Nur in der Zeitungsansicht verfugbar'
  },
]

export default class App extends React.Component {

  _options = () => {
    return [
      'Abbrechen',
      this._renderActionSheetItemComponent(text[0].title, text[0].description, images[0], true, 0),
      this._renderActionSheetItemComponent(text[1].title, text[1].description, images[1], true, 1),
      this._renderActionSheetItemComponent(text[2].title, text[2].description, images[2], true, 2)
    ]
  }

  _renderActionSheetItemComponent = (title, description, image, enabled, index) => {
    const withBorder = (index != 0) ? withBorder : null
    return (
      <ActionSheetItemContainer>
        <ActionSheetItemImageContainer>
          <ActionSheetItemImageView
            source={{ uri: image }} />
        </ActionSheetItemImageContainer>
        <ActionSheetItemSubContainer withBorder>
          <ActionSheetItemTitleView enabled>{title}</ActionSheetItemTitleView>
          <ActionSheetDescriptionView enabled>{description}</ActionSheetDescriptionView>
        </ActionSheetItemSubContainer>
      </ActionSheetItemContainer>
    )
  }

  render() {
    const title = 'Teilen und Exportieren'
    return (
      <View style={{ flex: 1 }}>
        <ActionSheet
          ref={o => this.action = o}
          options={this._options()}
          onPress={index => {
            console.log('Index is', index)
            this.action.hide()
          }}
          title={<Text style={{ marginLeft: 10, marginTop: 10, color: 'gray', fontSize: 12 }}>{title}</Text>}
          disabledItemsIndexes={[2]} />
        <TouchableHighlight onPress={() => this.action.show()}>
          <View style={{ width: 100, height: 300, backgroundColor: 'red' }} />
        </TouchableHighlight>
      </View>
    );
  }
}