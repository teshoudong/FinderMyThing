import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class Detail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', '')
        };
    }

    render() {
        const image = this.props.navigation.getParam('image', {});

        return (
            <View style={styles.container}>
                <Image resizeMode="contain" style={styles.image} source={{uri: image.url}}/>
                {image.points.map((point, index) => {
                    return (
                        <View style={[styles.point, { top: point.top, left: point.left }]} key={index}>
                            <View style={styles.pointReact}></View>
                            <View style={styles.pointTitleContainer}>
                                <View style={styles.pointArrow}></View>
                                <Text style={styles.pointTitle}>测试</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    image: {
        flex: 1
    },
    point: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute'
    },
    pointReact: {
        width: 10,
        height: 10,
        backgroundColor: '#0B152C',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF'
    },
    pointTitle: {
        fontSize: 12,
        color: '#FFFFFF'
    },
    pointTitleContainer: {
        padding: 6,
        borderRadius: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginLeft: 5
    },
    pointArrow: {
        position: 'absolute',
        left: -5,
        top: 7,
        borderTopWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderLeftWidth: 0,
        borderTopColor: 'transparent',
        borderRightColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent'
    }
});