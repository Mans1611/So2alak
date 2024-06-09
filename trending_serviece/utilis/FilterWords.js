import { dummySet } from "./dummyWords.js"

export const FilterWords = (questions)=>{
    let hash = {}
    try{
        const string = questions?.reduce((prev,cur)=>prev + cur.split(' ').join(' '),'')
        for(let word of string.split(' ')){
            if (!dummySet.has(word.toLowerCase()) && word.length < 15){
                if(word in hash ){
                    hash[word] += 1
                }else{
                    hash[word] = 1
                }
            }
        }
        const entries = Object.entries(hash);
        hash = entries.sort((a,b)=>b[1]-a[1])
        return hash.slice(0,5);
    }catch(err){
        return {}
    }
}