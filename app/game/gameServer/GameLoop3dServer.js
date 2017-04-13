const THREE = require('three');
const Projector = require('../gameHelpers/Projector');
import {collisionDetectGroup} from '../gameHelpers/collisionDetect';

export default class GameLoop3D {


    constructor() {
        this.camera = null;
        this.scene = null;
        this.renderer = null;

        this.objects3D = [];
        this.scene = new THREE.Scene();
    }


    addObject(game3DObject){
        this.objects3D.push(game3DObject);
        this.scene.add(game3DObject);
    }

    animateSpaceShips(spaceShips) {
        this.scene.updateMatrixWorld();

        // TODO update objects (
        // TODO collision should be detected by peers
        //



        // moving objects
        // let length = spaceShips.length;
        // if (length > 1) {
        //     while (length--) {
        //         spaceShips[length].x = 5;
        //         spaceShips[length].y = 5;
        //         spaceShips[length].z = 5;
        //         spaceShips[length].oblect3d.position.set(spaceShips[length].x, spaceShips[length].y, spaceShips[length].z);
        //     }
        // }


        let length = this.objects3D.length;
        if (length > 1) {
            while (length--) {
                if (this.objects3D[length].spaceShip) {
                    let spaceShip = this.objects3D[length].spaceShip;
                    spaceShip.x = 5;
                    spaceShip.y = 5;
                    spaceShip.z = 5;
                    this.objects3D[length].position.set(spaceShip.x, spaceShip.y, spaceShip.z);
                }
            }
        }


        // WORKING ON SERER TOO
        // let length = this.objects3D.length;
        // if (length > 1) {
        //     while (length--) {
        //         if (collisionDetectGroup(this.objects3D[0], this.objects3D[1])) {
        //             console.log('+');
        //         } else {
        //             console.log('-');
        //         }
        //     }
        // }

        //works for objects not groups ?!?
        //
        // if (collisionDetect(this.object, this.objects3D)){
        //     console.log("+")
        // }else{
        //     console.log("-")
        // }
    }
}


