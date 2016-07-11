module.exports = xyzObjectLocation;

function xyzObjectLocation (THREE) {
    'use strict';

    this.rotation = new THREE.Vector3(0, 0, 0);
    this.position = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);

    this.setRotation = function (x,y,z) {
        this.rotation.set(x, y , z);
    };

    this.setVelocity = function (x,y,z) {
        this.velocity.set(x, y , z);
    };

    this.accelerate = function(forceX,forceY,forceZ , quaternion ){
        var forceInRelationToObject = new THREE.Vector3( forceX,forceY,forceZ );
        var forceInRelationToWorld = forceInRelationToObject.applyQuaternion( quaternion );
        this.velocity.add(forceInRelationToWorld);
        return this.velocity;

    }


    this.getSpeed = function(){
        var speed = Math.sqrt((this.velocity.x * this.velocity.x) + (this.velocity.y * this.velocity.y) + (this.velocity.z * this.velocity.z));
        return speed;
    };



    this.move= function () {
        position.x += this.velocity.x;
        position.y += this.velocity.y;
        position.z += this.velocity.z;
    };

    this.getPosition = function(){
        return {"x":this.position.x, "y":this.position.y,"z":this.position.z}
    };
    this.getRotation= function(){
        return {"x":this.rotation.x, "y":this.rotation.y,"z":this.rotation.z}
    };

    this.setPosition = function(x,y,z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    };
    this.getCommsData = function(){
        return { "position":this.getPosition(),"rotation":this.getRotation()}
    }

}



