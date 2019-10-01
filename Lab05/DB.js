const util = require('util');
const events = require('events');

dbData = [
    { id: 0, name : 'aaaaaaaa', bday : '01.01.2001' },
    { id: 1, name : 'bbbbbbbb', bday : '02.02.2002' },
    { id: 2, name : 'cccccccc', bday : '03.03.2003' },
    { id: 3, name : 'dddddddd', bday : '04.04.2004' }
];

    function DB() {
        //GET request method
        this.getAllRows = () => {
            return dbData;
        };
        //POST request
        this.addRow = (row) => {
            dbData.push(row);
        };
        //PUT request method
        this.editRow = (id, row) => {
            let oldValue = dbData.find(element => element.id == id);
            let index = dbData.indexOf(oldValue)
            
            if (index !== -1) {
                dbData[index] = row;
            }
        };
        //DELETE request method
        this.deleteRow = (id) => {
            let row;
            for(let i = 0; i < dbData.length; i++) { 
                if (dbData[i].id == id) {
                    row = dbData[i];
                    dbData.splice(i, 1);
                }
            }
            return row;
        };

        //COMMIT request method
        this.commit = () => {
            console.log("Success commit.")
            return 0;
        };

        this.lastIndex = () => {
            return dbData.length - 1;
        }
    }


util.inherits(DB, events.EventEmitter);
module.exports = DB;