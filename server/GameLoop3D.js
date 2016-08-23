const THREE = require('three');
const Projector = require('../app/game/gameHelpers/Projector');
import {collisionDetect,collisionDetectGroup} from '../app/game/gameHelpers/collisionDetect';

export default class GameLoop3D {


    constructor() {
        this.camera = null;
        this.scene = null;
        this.renderer = null;

        this.objects3D = [];
        this.scene = new THREE.Scene();

        this.createObjects();
    }


    addObject(game3DObject){
        this.objects3D.push(game3DObject);
        this.scene.add(game3DObject);
    }


    createObjects() {

        // var materials = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide } ) ;
        //
        // this.object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1 ),  materials );
        // // object = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ),  materials );
        // this.object.position.set( 0, 0.1, 0.1 );
        // this.scene.add( this.object );
        // this.objects3D.push(this.object);
        // console.log("ball");
        //
        //
        // var materials = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide } ) ;
        // this.object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1 ),  materials );
        // // object = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ),  materials );
        // this.object.position.set( 0, 0, 0 );
        // this.scene.add( this.object );
        // console.log("ball");

    }

    animate() {
        this.scene.updateMatrixWorld();

        // TODO update objects (
        // TODO collision should be detected by peers
        //


        // NOT WORKING ON SERER ??????
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


