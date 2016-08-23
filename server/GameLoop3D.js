const THREE = require('three');
const Projector = require('../app/game/gameHelpers/Projector');
import {collisionDetectGroup} from '../app/game/gameHelpers/collisionDetect';

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

    animate() {
        this.scene.updateMatrixWorld();

        // TODO update objects (
        // TODO collision should be detected by peers
        //


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


