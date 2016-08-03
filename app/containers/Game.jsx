import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ClientGameLoop from '../gameHelpers/clientGameLoop';

import { fetchGameObjects, destroyGameObject,createGameObject } from 'actions/game';
import styles from 'css/components/game';

const cx = classNames.bind(styles);


/*


 <script src="http://localhost:8080/threejs/three.min.js"></script>
 <script src="http://localhost:8080/threejs/examples/js/libs/stats.min.js"></script>
 <script src="http://localhost:8080/threejs/examples/js/libs/dat.gui.min.js"></script>
 <script src="http://localhost:8080/threejs/examples/js/controls/OrbitControls.js"></script>
 <script src="http://localhost:8080/js/vendor/Detector.js"></script>

 */


class Game extends Component {


    componentDidMount() {
        console.log("componentDidMount");

        if(window == undefined) return; //client only

        var socket = require('socket.io-client')('http://localhost:3000');
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
        });
        var container = document.getElementById( 'container' );
        this.clientGameLoop = new ClientGameLoop(container);

    }
    componentWillUnmount(){
        console.log("delete game");
        if(window == undefined) return; //client only
        var container = document.getElementById( 'container' ).innerHTML = "";
        console.log("delete game");
        delete this.clientGameLoop;

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
                        onClick={destroyGameObject}
                >
                    destroyObject
                </button>
                <button className={ cx('button', 'destroy')}
                        onClick={createGameObject}
                >
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
