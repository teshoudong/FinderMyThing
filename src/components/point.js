import React from 'react';
import { Text, View, StyleSheet, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

class Point extends React.Component {
    constructor(props) {
        super(props);

        this.opacity = new Animated.Value(0.5);
        this.scale = new Animated.Value(0.5);
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        this.opacity.setValue(0.5);
        this.scale.setValue(0.5);
        Animated.parallel([
            Animated.timing(
                this.opacity,
                {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.ease
                }
            ),
            Animated.timing(
                this.scale,
                {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.ease
                }
            )
        ]).start(() => this.animate());
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={e => this.props.onPress(e)}>
                <View style={[styles.point, { top: this.props.top - 13, left: this.props.left - 10 }]}>
                    <View style={styles.pointReactContainer}>
                        <Animated.View style={[styles.pointReactLight, { opacity: this.opacity, transform: [{ scale: this.scale }] }]}></Animated.View>
                        <View style={styles.pointReact}></View>
                    </View>
                    <View style={styles.pointTitleContainer}>
                        <View style={styles.pointArrow}></View>
                        <Text style={styles.pointTitle}>{this.props.title}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

Point.defaultProps = {
    onPress: () => {}
};

Point.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func
};

const styles = StyleSheet.create({
    point: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute'
    },
    pointReactContainer: {
        width: 20,
        height: 20
    },
    pointReactLight: {
        backgroundColor: '#000000',
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    pointReact: {
        position: 'absolute',
        left: 5,
        top: 5,
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
        marginLeft: 5,
        height: 26
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

export default Point;