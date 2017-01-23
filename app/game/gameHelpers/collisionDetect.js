const THREE = require('three');

export function collisionDetect(obj, collidableMeshList) {
    // collision detection:
    //   determines if any of the rays from the cube's origin to each vertex
    //		intersects any face of a mesh in the array of target meshes
    //   for increased collision accuracy, add more vertices to the cube;
    //		for example, new THREE.CubeGeometry( 64, 64, 64, 8, 8, 8, wireMaterial )
    //   HOWEVER: when the origin of the ray is within the target mesh, collisions do not occur
    var originPoint = obj.position.clone();

    for (var vertexIndex = 0; vertexIndex < obj.geometry.vertices.length; vertexIndex++)
    {
        var localVertex = obj.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4( obj.matrix );
        var directionVector = globalVertex.sub( obj.position );
        var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( collidableMeshList );
        if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() )
        {
            return true;
        }
    }
    return false;
}


export function collisionDetect2(obj, collidableMeshList, group1) {

    const originPoint = group1.position.clone();

    for (var vertexIndex = 0; vertexIndex < obj.geometry.vertices.length; vertexIndex++)
    {
        var localVertex = obj.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4( group1.matrix );
        var directionVector = globalVertex.sub( group1.position );
        var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( collidableMeshList );
        if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){

            return true;
        }
    }
    return false;
}


export function collisionDetectGroup(group1, group2) {
    const group1Children = group1.children;
    let length = group1Children.length;

    while (length--) {
        if (collisionDetect2(group1Children[length], group2.children, group1)) {
            return true;
        }
    }
    return false;
}




