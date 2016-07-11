/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
var movementHelper = require('../../gameHelpers/movementHelper.js');
var THREE = require('three');
import expect from 'expect';

describe('move xyz test', () => {
    describe('xyz actions', () => {

        beforeEach(() => {
            //do something
        });

        afterEach(() => {
            //do something
        });



    });



    describe("Basic test", function() {

        var location = new movementHelper(THREE);
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


    describe("Object has forward velocity acelaration", function() {

        var location = new movementHelper(THREE);
        location.setRotation(1,0,0);
        location.setVelocity(1,0,0);
        location.setPosition(0,0,0);

        let speed = Math.round(location.getSpeed()* 100) / 100;
        it("speed has a value", function() {
            expect(speed).toBe(1.00);
        });


        let mesh = new THREE.Object3D();
        location.setVelocity(1,0,0);
        var v = location.accelerate(2,0,0,mesh.quaternion );

        let x = v.x;
        it("Accelerate and speed has a new value x", function() {
            expect(x).toBe(3);
        });
        let y = v.y;
        it("Accelerate and speed has a new value y", function() {
            expect(y).toBe(0);
        });
        let z = v.z;
        it("Accelerate and speed has a new value z", function() {
            expect(z).toBe(0);
        });


        //turn around fire rocket opposite way (positive number)
        mesh.rotateZ( Math.PI  ); //180 degrees

        let v2 = location.accelerate(1,0,0,mesh.quaternion );
        let x2 = v.x;
        it("2Accelerate and speed has a new value x", function() {
            expect(x2).toBe(2);
        });
        let y2 = Math.round(v.y* 100000) / 100000; //right is now left (s0 1 - (-1) =2)
        it("2Accelerate and speed has a new value y", function() {
            expect(y2).toBe(0);
        });
        let z2 = v.z;
        it("2Accelerate and speed has a new value z", function() {
            expect(z2).toBe(0);
        });

    });




});
