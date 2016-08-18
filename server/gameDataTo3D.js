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
    console.log('data.bluePrint[0]', data.bluePrint);
    object.position.set(data.bluePrint[0].x, data.bluePrint[0].y, data.bluePrint[0].z);
    group.add(object);
    group.position.set(data.x, data.y, data.z);

    return group;
}

