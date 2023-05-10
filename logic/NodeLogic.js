const bodyParser = require("body-parser");
const express = require("express")
const mysql = require("mysql");
const {spawn} = require("child_process");

function getData(type, original_data, callback) {
    let py = spawn("python", [
        "C:/Users/MIHIR/.vscode/password-manager/AES.py",
        type,
        original_data,
    ]);
    let result = [];

    py.stdout.on("data", (data) => {
        result.push(...data.toString().split(""));
    });

    py.stderr.on("data", (data) => {
        callback(data.toString(), null);
    });

    py.on("close", (code) => {
        if (code !== 0) {
            callback(`Process exited with code ${code}`, null);
        }
        resultstr = result.join("");
        const regex = /[\[\]']/g;
        r = resultstr.replace(regex, "");
        arr = r.split(",");

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].trim();
            if (arr[i].endsWith("\r\n")) {
                arr[i] = arr[i].trimEnd();
            }
            if (arr[i].trim() === "") {
                arr.splice(i, 1);
                i--;
            }
        }
        //arr[arr.length - 1] = arr[arr.length - 1].slice(0, arr.length - 5)
        callback(null, arr);
    });
}

const app = express()
const port = 8000

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "passwordmanager",
});

con.connect(function(err) {

    function verifyLogin(
        txt_unverified_username,
        txt_unverified_password,
        txt_name,
        callback
    ) {
        let q = "SELECT * FROM login_creds WHERE Name = ?";
        con.query(q, [txt_name], (error, data) => {
            let bool = false;
            for (let i = 0; i < data.length; i++) {
                let row = data[i];
                getData(
                    "decrypt",
                    [row.UserName, row.Password],
                    (error, decrypted_data) => {
                        if (
                            decrypted_data[0] === txt_unverified_username &&
                            decrypted_data[1] === txt_unverified_password
                        ) {
                            bool = true;
                            callback(bool);
                        } else if (i === data.length - 1) {
                            callback(bool);
                        }
                    }
                );
            }
        });
    }

    function removeDuplicates(array) {
        let result = [];
        let map = new Map();

        for (let i = 0; i < array.length; i++) {
            let obj = array[i];
            let key = Object.values(obj).join('|');
            if (!map.has(key)) {
                map.set(key, true);
                result.push(obj);
            }
        }

        return result;
    }

    function retrieveAllPasswords(txt_username, callback) {
        txt_username = txt_username.trim();
        let q = "SELECT AccountUserName FROM passwords";
        con.query(q, (error, result) => {
            if (error) return callback(error);

            let objects = [];

            for (let i = 0; i < result.length; i++) {
                let element = result[i];

                getData("decrypt", [element.AccountUserName], (error, data) => {
                    if (error) return callback(error);

                    if (data[0] == txt_username) {
                        q = "SELECT * FROM passwords WHERE AccountUserName = ?";
                        con.query(
                            q,
                            [element.AccountUserName],
                            (error, data) => {
                                if (error) return callback(error);

                                data.forEach((row) => {
                                    let obj = {
                                        UserName: row.UserName,
                                        Domain: row.Domain,
                                        Password: row.Password,
                                    };
                                    objects.push(obj);
                                });

                                if (i === result.length - 1) {
                                    // If this is the last iteration, call the callback with the final result
                                    return callback(null, objects);
                                }
                            }
                        );
                    } else {
                        if (i === result.length - 1) {
                            // If no match is found and this is the last iteration, call the callback with an error message
                            return callback("No matching username found");
                        }
                    }
                });
            }
        });
        return callback("No matching username found");
    }

    function decryptPasswordObjects(objects, callback) {
        if ((objects == {})) return callback("No passwords matched");
        let counter = 0;
        objects.forEach((object) => {
            getData(
                "decrypt",
                [object.UserName, object.Password, object.Domain],
                (error, data) => {
                    if (error) return callback(error);
                    object.UserName = data[0];
                    object.Password = data[1];
                    object.Domain = data[2];
                    counter++;
                    if (counter === objects.length) {
                        return callback(null, objects);
                    }
                }
            );
        });
    }

    function getAllDataOfAUser(txt_UserName) {
        retrieveAllPasswords(txt_UserName, (error, data) => {
            if (data == undefined) console.log("No passwords matched");
            else {
                decryptPasswordObjects(data, (error, data) => {
                    console.log(removeDuplicates(data));
                });
            }
        });
    }

    function storeAPassword(accountusername, txt_username, domain, password, callback) {
        let q = "SELECT AccountUserName from passwords"
        con.query(q, (error, AccountUserNames) => {
            if (error) {
                return callback(error);
            }
            if (AccountUserNames.length == 0) {
                getData("encrypt", [accountusername, txt_username, domain, password], (error, encrypted_data) => {
                    if (error) {
                        return callback(error);
                    }

                    let q = "INSERT INTO passwords(AccountUserName, UserName, Domain, Password) VALUES (?, ?, ?, ?)"
                    con.query(q, [encrypted_data[0], encrypted_data[1], encrypted_data[2], encrypted_data[3]], (error, result) => {
                        if (error) {
                            return callback(error);
                        }

                        if (result.affectedRows == 1) {
                            return callback("Password has been stored");
                        } else {
                            return callback("Operation failed");
                        }
                    })
                })
            }
            for (let i = 0; i < AccountUserNames.length; i++) {
                getData(
                    "decrypt",
                    [AccountUserNames[i].AccountUserName],
                    (error, decryptedAccountUserName) => {
                        if (error) {
                            return callback(error);
                        }
                        if (decryptedAccountUserName == accountusername) {
                            let q = "SELECT * FROM passwords WHERE AccountUserName = ?"
                            con.query(q, [AccountUserNames[i].AccountUserName], (error, data) => {
                                if (error) {
                                    return callback(error);
                                }

                                let found = false;
                                for (let j = 0; j < data.length; j++) {
                                    let row = data[j];
                                    getData("decrypt", [row.Domain, row.UserName, row.Password], (error, decrypted_data) => {
                                        if (error) {
                                            return callback(error);
                                        }

                                        if (decrypted_data[0] == domain && decrypted_data[1] == txt_username && decrypted_data[2] == password) {
                                            found = true;

                                            return callback("The entered creds have already been stored");
                                        } else if (decrypted_data[0] == domain && decrypted_data[1] == txt_username) {
                                            getData("encrypt", [password], (error, encrypted_password) => {
                                                if (error) {
                                                    return callback(error);
                                                }

                                                let q = "UPDATE passwords SET password = ? WHERE AccountUserName = ? AND UserName = ? AND Domain = ?"
                                                con.query(q, [encrypted_password[0], AccountUserNames[i].AccountUserName, row.UserName, row.Domain], (error, result) => {
                                                    if (error) {
                                                        return callback(error);
                                                    }

                                                    if (result.affectedRows == 1) {
                                                        return callback("Password has been changed");
                                                    } else {
                                                        return callback("Operation failed");
                                                    }
                                                })
                                            })
                                        }
                                    });
                                }

                                if (!found) {
                                    getData("encrypt", [accountusername, txt_username, domain, password], (error, encrypted_data) => {
                                        if (error) {
                                            return callback(error);
                                        }
                                        if (!found) {
                                            let q = "INSERT INTO passwords(AccountUserName, UserName, Domain, Password) VALUES (?, ?, ?, ?)"
                                            con.query(q, [encrypted_data[0], encrypted_data[1], encrypted_data[2], encrypted_data[3]], (error, result) => {
                                                if (error) {
                                                    return callback(error);
                                                }

                                                if (result.affectedRows == 1) {
                                                    return callback("Password has been stored");
                                                } else {
                                                    return callback("Operation failed");
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                )
            }
        })
    }

    function register(txt_unverified_username, txt_unverified_password, txt_name, callback) {
        let q = "SELECT UserName FROM login_creds"
        con.query(q, (error, rows) => {
            let found = false;
            for (let i = 0; i < rows.length; i++) {
                getData("decrypt", [rows[i].UserName], (error, decrypted_username) => {
                    if (decrypted_username == txt_unverified_username) {
                        found = true;
                        return callback("This User Name is already registered");
                    }
                    if (i == rows.length - 1 && !found) {
                        let q = "INSERT INTO login_creds(UserName, Password, Name) VALUES (?, ?, ?)";
                        getData("encrypt", [txt_unverified_username, txt_unverified_password, txt_name], (error, encrypted_data) => {
                            con.query(q, [encrypted_data[0], encrypted_data[1], txt_name], (error, data) => {
                                if (data != []) return callback("User is Registered");
                                return callback("error");
                            });
                        });
                    }
                });
            }
        })
    }
    app.use(bodyParser.json())
    app.post("/login",(req,res)=>{
        let {
            username,
            password,
            name
        } = req.body
        verifyLogin(username,password,name, (error, result) => {
            res.json({"status":result});
        })
    });
    app.post("/register",(req,res)=>{
        let {
            username,
            password,
            name
        } = req.body
        register(username,password,name, (error, result) => {
            if(result==="User is Registered") res.json({"status":true , "Error_message":null})
            else res.json({"status":false,"error_message":result});
        })
    });
    app.post("/home",(req,res)=>{
        let {
            username
            } = req.body
        let result = getAllDataOfAUser(username);
        if(result != "No passwords matched") res.json({"status":true,"data":result})
        else res.json({"status":false,"data":result})
    });
    app.post("/add",(req,res)=>{
        let {
            accountusername,
            username, 
            domain,
            password
        } = req.body
        storeAPassword(accountusername, username, domain, password, (error, result) => {
            if(result==="Password has been stored") res.json({"status":true,"error_message":null});
            else res.json({"status":false,"error_message":result});
        })
    });
    app.listen(port,()=>{
        console.log("server is live")
    });
});


//getData("encrypt",["MihirP007", "MihirP007", "www.genshin.com", "Mihir123@"],(error,data)=>{console.log(data);})
//getData("decrypt",['gAAAAABkQf7Z3P0nPNn4dx9xtnzml1L1YWh1q76zpzRmm94POpcS83Gv35CCWujTHZX2yU0f1hcD6vBMVqDTzhZrAQQeuAtvlqLqW6Wnc2vF_20b3kfZ8Zs='],(error,data)=>{console.log(data)})

// let server = http.createServer(function (req, res) {
// }).listen(8000);

    // verifyLogin("KrishNana","Nana2004RCBfan","Krish",(data)=>{
    //               console.log(data);
    //             })
