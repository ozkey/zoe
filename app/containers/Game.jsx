import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { fetchGameObjects, destroyGameObject,createGameObject } from 'actions/game';
import styles from 'css/components/game';

const cx = classNames.bind(styles);

class Game extends Component {

    //Data that needs to be called before rendering the component
    //This is used for server side rending via the fetchComponentDataBeforeRender() method
    static need = [  // eslint-disable-line
        fetchGameObjects
    ]

    render() {
        const {fetchGameObjects, destroyGameObject,createGameObject } = this.props;


        return (
            <div className={cx('game')}>
              
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

        gameObjects: state.game.gameObjects,
        gameObject: state.game.gameObject
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createGameObject, destroyGameObject, fetchGameObjects  })(Game);
