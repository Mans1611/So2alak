export const CheckValueExisit = async(table_name,attr,value,database_con)=>{
    try{
        const con = await database_con.connect();

        const sqlCommand = 
        `SELECT * FROM ${table_name} 
        WHERE ${attr} = '${value}';`
        
        let result = await con.query(sqlCommand);
        return result.rows.length > 0 


    }catch(err){

    }
}