const THREE = require('three');

export function gameDataTo3D(data, isWireframe) {
    const group = new THREE.Group();

    const getMaterial = () => {
        const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide });

        if (isWireframe) {
            return wireframeMaterial;
        }
        return new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide });
    };

    const object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), getMaterial());


    // var materials = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide } ) ;
    // this.object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1 ),  materials );
    // // object = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ),  materials );
    // this.object.position.set( 0, 0, 0 );
    // this.scene.add( this.object );
    // console.log("ball");


    console.log('data.bluePrint[0]', data.bluePrint);
    object.position.set(data.bluePrint[0].x, data.bluePrint[0].y, data.bluePrint[0].z);
    group.add(object);
    group.position.set(data.x, data.y, data.z);

    return group;
}

