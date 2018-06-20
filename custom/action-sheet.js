/**
 * 
 *  Custom ActionSheet Component
 * 
 *  Props:
 *  @param {array} options - (Required). Action Sheet items.. Could be component or string.
 *                              - at least 2 items
 *                              - The first entry is the name of the cancel button
 *  @param {string} title - (Optional). Title of the component. Could be String or React Component
 *  @param {Promise} onPress - Function fired when some action item is pressed on
 *  @param {array} disabledItemsIndexes - (Optional). List of indexes for which onPress action is disabled.
 *  @param {number} disabledItemsOpacity - (Optional). The opacity of the view. Default is 0.2
 *  @param {function} show - Show the action sheet
 *  @param {function} hide - Hides the action sheet
 */

import React, { Component } from 'react'
import { View, Modal, Text, TouchableHighlight, StyleSheet, Dimensions, Platform } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { isTablet } from 'react-native-device-info'

const { height, width } = Dimensions.get('window')
const ITEM_HEIGHT = 60
const BORDER_RADIUS = 8

export default class ActionSheet extends React.Component {
    constructor(props) {
        super(props)
        this.disabledItemsOpacity = (this.props.disabledItemsOpacity) ? this.props.disabledItemsOpacity : 0.2
        this.title = (this.props.title) ? this.props.title : null
        

        this.state = {
            visible: false,
            rect: {
                height: 0,
                width: 0
            },
            bottomRect: {},
        }
    }

    /**
     * External methods
     * @memberof ActionSheet
     */
    show() {
        this.setState({ visible: true })
    }

    hide() {
        this.setState({ visible: false })
    }

    // Methods
    _onActionItemPress = () => this.props.onPress(index)

    _renderDefaultItem = (title, index) => {
        return <Text style={styles.itemText}>{title}</Text>
    }

    _renderActionItem = (item, index, disabled) => {
        return (
            <View style={{
                justifyContent: 'center', alignItems: 'center',
                width: this.state.rect.width,
                height: ITEM_HEIGHT,
                opacity: (disabled) ? this.disabledItemsOpacity : 1
            }}>
                {
                    React.isValidElement(item) ? item : this._renderDefaultItem(item, index)
                }
            </View>
        )
    }

    _renderItems = () => {

        // Iterate through the items
        return this.props.options.slice(0).reverse().map((item, index) => {

            // Margin between cancel button and 
            const marginTop = isTablet() ? 0 : (index == this.props.options.length - 1) ? 10 : 0
            const topBorderRadius = (index == this.props.options.length - 1 || (index == 0 && !this.props.title)) ? BORDER_RADIUS : 0
            const bottomBorderRadius = ((index == this.props.options.length - 1) || (index == this.props.options.length - 2)) ? BORDER_RADIUS : 0

            // Render view
            return (
                <View style={{
                    backgroundColor: 'white',
                    marginTop: marginTop,
                    width: this.state.rect.width,
                    height: ITEM_HEIGHT,
                    borderTopLeftRadius: topBorderRadius,
                    borderTopRightRadius: topBorderRadius,
                    borderBottomLeftRadius: bottomBorderRadius,
                    borderBottomRightRadius: bottomBorderRadius
                }}>
                    {
                        (this.props.disabledItemsIndexes && this.props.disabledItemsIndexes.includes(index)) ? this._renderActionItem(item, index, true)
                            : <TouchableHighlight
                                underlayColor='gray'
                                activeOpacity={0.7}
                                onPress={() => this.props.onPress(index)}>
                                {this._renderActionItem(item, index, false)}
                            </TouchableHighlight>
                    }
                </View>
            )
        })
    }

    _renderTitleView = () => {
        return (this.props.title) ?
            <View style={[styles.titleContainer, {
                width: this.state.rect.width,
                borderTopLeftRadius: BORDER_RADIUS,
                borderTopRightRadius: BORDER_RADIUS
            }]}>
                {
                    React.isValidElement(this.props.title) ? this.props.title
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Text style={styles.titleText}>{this.props.title}</Text>
                        </View>
                }
            </View >
            : null
    }

    render() {
        const modalContainerProps = isTablet() ? { justifyContent: 'center' } : null
        const top = this.state.rect.height - this.state.bottomRect.height - (Platform.OS != 'ios') ? 20 : 0
        return (
            <Modal
                key={this.state.visible}
                visible={this.state.visible}
                transparent={true}
                animationType='fade'
                onDismiss={() => this.setState({ visible: !this.state.visible })}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} forceInset={{ vertical: 'always' }}>
                    <View style={[styles.container, modalContainerProps]} onLayout={e => {
                        this.setState({ rect: !isTablet() ? e.nativeEvent.layout : { height: width / 2, width: width / 2 } })
                    }}>
                        <View style={[styles.mainContainer, { top: this.state.rect.height - this.state.bottomRect.height - ((Platform.OS != 'ios') ? 10 : 0) }]} onLayout={e => {
                            this.setState({ bottomRect: !isTablet() ? e.nativeEvent.layout : { height: width / 2, width: width / 2 } })
                        }}>
                            {this._renderTitleView()}
                            {this._renderItems()}
                        </View>
                    </View>
                </SafeAreaView>
            </Modal >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        alignItems: 'center'
    },
    mainContainer: {
        backgroundColor: 'transparent',
        borderRadius: BORDER_RADIUS,
    },
    itemText: {
        fontSize: 17,
        color: '#335DC6',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleText: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center'
    },
    titleContainer: {
        height: 50,
        backgroundColor: 'white',
        borderBottomColor: '#ECF0F1',
        borderBottomWidth: 1,
        padding: 5
    }
})