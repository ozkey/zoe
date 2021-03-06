
export function getSector() {
    const sectorSize = 10000;
    const sectorZ = 0; // dObject.x depth
    const sectorX = 0; // dObject.y sides
    return sectorZ + '.' + sectorX + '-' + (sectorZ + sectorSize) + '.' + (sectorX + sectorSize);
}
export function getSectorsSquare() {
    // TODO
    // send the the 3 closes squares the user may be going to
    //   [ ][ ][ ][ ]
    //   [ ][X][<][ ]
    //   [ ][X][X][ ]
    //   [ ][ ][ ][ ]

    const sectorSize = 10000;
    const sectorZ = this.userSettings; // depth
    const sectorX = 0; // sides
    return [sectorZ + '.' + sectorX + '-' + (sectorZ + sectorSize) + '.' + (sectorX + sectorSize)];
}
