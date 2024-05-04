
export const GetFiles = async (data,con)=>{
    let newData = [];
   
    for(let item of data){
        if(item.q_files){
            let {rows} = await con.query(`SELECT * FROM files WHERE id = ${item.q_files};`)
            rows[0].data = Buffer.from(rows[0].data).toString('base64')
            newData.push({...item,...rows[0]})
        }else{
            newData.push({...item})
        }
    }
   
    return newData
}