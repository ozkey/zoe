var xyzObjectLocation = require('../../gameHelpers/xyzObjectLocation.js');
import expect from 'expect';

var THREE = require('three');

describe("A suite s", function() {

    var location = new xyzObjectLocation(THREE);
    location.setRotation(3,1,2);
    location.setVelocity(1,2,3);
    location.setPosition(1,2,3);

    var pos = eval( location.getPosition());
    var dir = eval( location.getRotation());

    it("position contains x", function() {
        expect(pos.x ==  "1" ).toBe(true);
    });
    it("position contains y", function() {
        expect(pos.x ==  "1" ).toBe(true);
    });
    it("position contains z", function() {
        expect(pos.x ==  "1" ).toBe(true);
    });

    it("speed has a value", function() {
        expect(Math.round(location.getSpeed()* 100) / 100).toBe(3.74);
    });

});



describe("A suite velocity", function() {

    var location = new xyzObjectLocation(THREE);
    location.setRotation(1,0,0);
    location.setVelocity(1,0,0);
    location.setPosition(0,0,0);

    //var geometry = new THREE.BoxGeometry( 20, 20, 20 );
    //var mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial( ) );

    var mesh = new THREE.Object3D();

    it("speed has a value", function() {
        expect(Math.round(location.getSpeed()* 100) / 100).toBe(1.00);
    });

    it("Accelarate and speed has a new value", function() {
        //expect(mesh.quaternion).toBe(1.00);
        location.setVelocity(0,0,0);
        var v = location.accelerate(10,1,1,mesh.quaternion );
        expect(v.x).toBe(10);
        expect(v.y).toBe(1);
        expect(v.z).toBe(1);

        //turn around fire rocket opposite way (positive number)
        mesh.rotateZ( Math.PI  ); //180 degrees

        v = location.accelerate(10,-1,-1,mesh.quaternion );

        expect(v.x).toBe(0);
        expect(Math.round(v.y* 100000) / 100000).toBe(2); //right is now left (s0 1 - (-1) =2)
        expect(v.z).toBe(0);

    });








});