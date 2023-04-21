// Merge Server , child Process and database functions 
const http = require("http")
const mysql = require('mysql')
const { spawn } = require('child_process');

function getData(type, original_data, callback) {
    let py = spawn('python', ['C:/Users/MIHIR/.vscode/password-manager/AES.py', type, original_data]);
    let result = [];

    py.stdout.on('data', (data) => {
        result.push(...data.toString().split(''));
    });

    py.stderr.on('data', (data) => {
        callback(data.toString(), null);
    });

    py.on('close', (code) => {
        if (code !== 0) {
            callback(`Process exited with code ${code}`, null);
        }
        const resultStr = result.join('');
        callback(null, resultStr);
    });
}



let server = http.createServer(function (req, res) {


    //making a connection with database
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "passwordmanager"
    })
    con.connect(function (err) {
        if (err) return console.error('error: ' + err.message);
        //few methods required to communicated with database


        register("HimanishMore","Himanish123@",'Kleo')

        function validate(unverified_username, unverified_password, name, callback) {
            let q = "SELECT * FROM login_creds WHERE Name = ? ";
            con.query(q, [name], (error, data) => {
                if (error) {
                    console.error(error);
                    callback(false);
                } else {
                    let validated = false;
                    for (let row of data) {
                        getData("decrypt", [row.UserName, row.Password], (error, result) => {
                            if (error) {
                                console.error(error);
                                callback(false);
                            } else {
                                let regex = /'([^']*)'/g;
                                let matches = result.match(regex);
                                if (matches && matches.length === 2 && matches[0] === `'${unverified_username}'` && matches[1] === `'${unverified_password}'`) {
                                    validated = true;
                                }
                                if (row === data[data.length - 1]) {
                                    callback(validated);
                                }
                            }
                        });
                    }
                }
            });
        }
        
        function register(username,password,name){
            if(checkUserNamesExists(username)== true) return console.log("UserName is already registered pick another username") 

            getData("encrypt",[[username,password,name]],(error,result)=>{
                let regex = /'([^']*)'/g;
                let matches = result.match(regex);
            
            let query = "INSERT into login_creds(UserName,Password) VALUES(?,?,?)"
            con.query(query,matches,(error,result)=>{
                if(error) return console.error(error)
                console.log("")
                if(result) return true;
                else return false;
            }) })
        }
        function checkUserNamesExists(unverified_username) {
            let bool = false;
            let q = "SELECT UserName FROM login_creds "
            con.query(q ,(error, result) => {
                if (result == {}) bool = false;
                getData("decrypt",result,(error, result) =>{
                    if(error) console.error(error)
                    if(result.includes(unverified_username)) return true;
                    else false;
                })
            })
            return bool
        }

        // function retrieveAllPassowords(username){
        //     let query = "SELECT * FROM passwords WHERE UserName = ?"
        //     con.query(query,[username],(error,result)=>{
        //         if(error) return console.error(error)
        //         if(result !={}){
        //             pairs = Array()
        //             result.forEach(element => {
        //                 pairs[element.UserName] = Array(element.Domain,element.Password)
        //             });
        //             return pairs;
        //         }
        //         else console.log("No Passwords are stored")
        //     })
        // }
        // function storeAPassoword(username,domain,password){
        //     let query = "INSERT into passwords(UserName,Domain,Password) VALUES(?,?,?)"
        //     con.query(query,[username,domain,password],(error,result)=>{
        //         if(error) return console.error(error)
        //         if(result) console.log("Password is stored successfully")
        //         else console.log("Process unsccessfull")
        //     }) 
        // }
        const { url } = req
        // const { unverified_username, unverified_password } = req.body
        // unverified_username = "KrishNana"
        // unverified_password = "Nana2004RCBfan"
        // getData("encrypt",[unverified_username,unverified_password],(error,result)=>{
        //     if(error) return error;
        //     else{
        //         console.log(result)
        //     }
        // })

        // if (url === "./register") {
        //     const { unverified_username, unverified_password } = req.body
        //     let py = spawn('python', ['C:/Users/MIHIR/.vscode/password-manager/AES.py', 'encrypt',
        //         unverified_username, unverified_password])
        //     let encoded_name = data.toString().split("!!!!!")[0]
        //     let encoded_password = data.toString().split("!!!!!")[1]
        //     if (register(encoded_name, encoded_password)) {
        //         res.write("Registration successfull")
        //     }
        //     else {
        //         res.write("Registration unsuccessfull")
        //     }
        // }
        // if (url === "./addAPassword") {
        //     const { username, password, domain } = req.body

        //     let encoded_name = data.toString().split("!!!!!")[0]
        //     let encoded_password = data.toString().split("!!!!!")[1]
        // }
        // if (url === "./main") {

        // }
    })
    res.end();

}).listen(8000)

