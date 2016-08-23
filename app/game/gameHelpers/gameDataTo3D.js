const THREE = require('three');

export function gameDataTo3D(data, isWireframe) {
    const group = new THREE.Group();

    const getMaterial = () => {
        const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide });

        if (isWireframe) {
            return wireframeMaterial;
        }
        return new THREE.MeshBasicMaterial( { color: 0x112233, wireframe: false, transparent: false, opacity: 1, side: THREE.DoubleSide });
    };


    let length = data.bluePrint.length
    while (length--) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), getMaterial());
        object.position.set(data.bluePrint[length].c[0], data.bluePrint[length].c[1], data.bluePrint[length].c[2]);
        group.add(object);
    }
    group.position.set(data.x, data.y, data.z);

    return group;
}

