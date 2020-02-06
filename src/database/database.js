import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);


const database_name = "mst_person.db"
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;


export default class Database {
  constructor() {
    this.db;
  }
    // Initial Database
    async initDb() {
      SQLite.openDatabase()
        .then((db) => {

        })
        .catch();

      await SQLite.echoTest();
      const db = await SQLite.openDatabase();

    }

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
                    console.log(error, 'Close Database failed')
                });
        }else{
            console.log('Database Was Not Openeded')
        }
    }

    users() {
        return new Promise((resolve) => {
          const users = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM users', []).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`Prod ID: ${row.userId}, Prod Name: ${row.userName}`)
                  const { userId, userName } = row;
                  users.push({
                    userId, 
                    userName
                  });
                }
                console.log(users);
                resolve(users);
              });
            }).then((result) => {
              // this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

    createUser(user) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO users VALUES (?, ?)', [user.userId, user.userName]).then(([tx, results]) => {
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

      deleteProduct() {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('DELETE FROM users').then(([tx, results]) => {
                console.log(results, 'BERHASIL');
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
