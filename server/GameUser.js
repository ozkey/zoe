export default class GameUser {

    constructor(userSettings) {
        this.settings = userSettings;
        this.sector = this.getSector(userSettings);
        this.ioRooms = [];
    }

    getSector() {
        const sectorSize = 10000;
        const sectorZ = this.userSettings; // depth
        const sectorX = 0; // sides
        return sectorZ + '.' + sectorX + '-' + (sectorZ + sectorSize) + '.' + (sectorX + sectorSize);
    }

    getSectorsSquare() {
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
}
