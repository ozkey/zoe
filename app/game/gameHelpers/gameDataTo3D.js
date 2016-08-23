const THREE = require('three');

export function gameDataTo3D(data, isWireframe) {
    const group = new THREE.Group();

    const getMaterial = () => {
        const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide });

        if (isWireframe) {
            return wireframeMaterial;
        }
        const texture = new THREE.TextureLoader().load(require('../../images/textures/metal.jpg'));
        const material = new THREE.MeshBasicMaterial({ map: texture});
        return material;
    };


    let length = data.bluePrint.length
    while (length--) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), getMaterial());
        object.position.set(data.bluePrint[length].c[0], data.bluePrint[length].c[1], data.bluePrint[length].c[2]);
        object.castShadow = true;
        object.receiveShadow = true;
        group.add(object);
    }
    group.position.set(data.x, data.y, data.z);

    return group;
}

