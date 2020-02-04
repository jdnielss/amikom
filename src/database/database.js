import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);


const database_name = "mst_person.db"
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;


export default class Database {
    // Initial Database
    initDB(){
        let db;
        return new Promise((resolve, reject) => {
            console.log('Plugin intergrity Check...');
            SQLite.echoTest()
            .then(() => {
                console.log('Intergrity Check Passed');
                console.log('Open Database...');
                SQLite.openDatabase(
                    database_name,
                    database_size,
                    database_version, 
                    database_displayname
                )
                .then((DB) => { 
                    db = DB;
                    console.log('Database open');
                    db.executeSql('SELECT * FROM users').then(() => {
                        console.log('Database Ready');
                    }).catch((error) => {
                        console.log('Recieved Error', error);
                        console.log('Database not yet Ready')
                        db.transaction((trx) => {
                            trx.executeSql('CREATE TABLE IF NOT EXISTS users (userId, userName)');
                        }).then(() => {
                            console.log('table Create Success')
                        }).catch((error) => {
                            console.log('table Create Error', error)
                        });
                    });
                    resolve(db);
                })
                .catch((error) => {
                    console.log(error)
                })
            })
            .catch((error) => {
                console.log('Echo test failed', error)
            });
        });
    };

    // Close Database
    closeDatabase(db){
        if (db) {
            console.log('Closing database');
            db.close()
                .then((status) => {
                    console.log('DB Closed')
                })
                .catch((error) =>{
                    this.errorCB(error)
                });
        }else{
            console.log('Database Was Not Openeded')
        }
    }
    // List Of Users
    // users(){
    //     return new Promise((resolve, reject) => {
    //         const users = [];
    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('SELECT * from users', []).then(([tx, results]) => {
    //                     console.log('QUERY COMPLETED')
    //                     let length = results.rows.length;
    //                     for(let i = 0; i < length; i++) {
    //                         let row = results.rows.item(i);
    //                         console.log(`User :  $(row.userName)`)
    //                         const {userId, userName} = row
    //                         users.push({
    //                             userId, userName
    //                         });
    //                     }
    //                     console.log(users);
    //                     resolve(users);
    //                 }) ;
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((error) => {
    //                 console.log('Error',error)
    //             });
    //         });
    //     }).catch((error) => {
    //         console.log('Error 2',error)
    //     })
    // }

    users() {
        return new Promise((resolve) => {
          const products = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM users ', []).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                //   console.log(`Prod ID: ${row.userId}, Prod Name: ${row.userName},`)
                  const { userId, userName } = row;
                  products.push({
                    prodId,
                    prodName,
                    prodImage
                  });
                }
                // console.log(products);
                resolve(products);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

    createUser(prod) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO users VALUES (?, ?)', [prod.userId, prod.userName]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }
}