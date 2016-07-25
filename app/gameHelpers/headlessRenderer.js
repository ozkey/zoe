var THREE = require('three');
var Projector = require('./Projector');


THREE.headlessRenderer = function ( parameters ) {
    var _this = this,
        _projector = new THREE.Projector();


    this.sortObjects = true;
    this.sortElements = true;


    this.render = function ( scene, camera ) {
        _projector.projectScene( scene, camera, this.sortObjects, this.sortElements );
        return;

    };


};
