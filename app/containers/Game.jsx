import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import GameLoopClient from './GameLoopClient';

import { fetchGameObjects, destroyGameObject,createGameObject } from 'actions/game';
import styles from 'css/components/game';

const cx = classNames.bind(styles);

class Game extends Component {

    componentDidMount() {
        console.log("componentDidMount");

        if(window == undefined) return; //client only
        var container = document.getElementById( 'container' );
        this.gameLoopClient = new GameLoopClient(container);

        this.socket = require('socket.io-client')('http://localhost:3000');
        this.socket.on('news', (data) => {
            console.log(data);
            this.socket.emit('my other event', { my: 'data' });
        });
        this.socket.on('tick',  (data) => {
            this.gameLoopClient.animate(data)

        });



    }
    componentWillUnmount(){
        console.log("delete game");
        if(window == undefined) return; //client only
        var container = document.getElementById( 'container' ).innerHTML = "";
        console.log("close game");
        // this.socket.emit('close');
        this.socket.close();
        this.gameLoopClient.destroy();
        delete this.gameLoopClient;


    }


    //Data that needs to be called before rendering the component
    //This is used for server side rending via the fetchComponentDataBeforeRender() method
    static need = [  // eslint-disable-line
        fetchGameObjects
    ]

    render() {
        const {fetchGameObjects, destroyGameObject,createGameObject } = this.props;
        console.log(this.props.user);
        return (
            <div className={cx('game')}>
                data:{this.props.gameObjects.length>0?this.props.gameObjects[0].text :""}
                <br />
                user:{this.props.user.authenticated?"yes":"no"}
                <br />
                <button className={ cx('button', 'destroy')}
                        onClick={destroyGameObject}>
                    destroyObject
                </button>
                <button className={ cx('button', 'destroy')}
                        onClick={createGameObject}>
                    createObject
                </button>
                <div id="container"></div>
            </div>
        );
    }
}

Game.propTypes = {
    gameObjects: PropTypes.array.isRequired,
    destroyGameObject: PropTypes.func.isRequired,
    createGameObject: PropTypes.func.isRequired,
    fetchGameObjects: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
        gameObjects: state.game.gameObjects,
        gameObject: state.game.gameObject
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createGameObject, destroyGameObject, fetchGameObjects  })(Game);
