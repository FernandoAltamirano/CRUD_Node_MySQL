

function list(connect){
   return new Promise((resolve,reject) => {
        connect.query('SELECT * FROM customers',(error,data) => {
            if(error){
                return reject(error)
            }
            else{
                resolve(data)
           }
        })
   })
}

function add(connect,body){
    return new Promise((resolve,reject) => {
        if(!body.address || !body.name || !body.phone){
            // console.log(error);
            return reject('ERROR')
        }
        else{
            // console.log('EXITO');
            let customer = body
            connect.query('INSERT INTO customers set ?',[customer],(error,data) => {
                if(error){
                    reject(error)
                }else{
                    resolve()
                }
            })
        }
    })
}

function update(connect,id){
    return new Promise((resolve,reject) => {
        connect.query('SELECT * FROM customers WHERE id = ?',[id],(error,data) => {
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        })
    })
}

function insert(connect,id,body){
    return new Promise((resolve,reject) => {
        connect.query('UPDATE customers set ? WHERE id = ?',[body,id],(error,data) => {
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        })
    })
}

function remove(connect,id){
    return new Promise((resolve,reject) => {
        connect.query('DELETE FROM customers WHERE id= ?',[id],(error,data) => {
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
module.exports = {
    list,
    add,
    remove,
    update,
    insert
}