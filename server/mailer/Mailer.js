import mailer from 'nodemailer';
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current module's URL
const currentModuleUrl = import.meta.url;

// Convert the module URL to a file path
const currentFilePath = fileURLToPath(currentModuleUrl);

// Get the directory path
const currentDir = path.dirname(currentFilePath);

const transporter = mailer.createTransport({
    service:'gmail',
    auth:{
        user: 'mans.yousef1611@gmail.com',
        pass: 'ezym jfga xwjc qkmk'
    }
})
let html = fs.readFileSync(path.join(currentDir,'VerificationCode.html'),'utf-8')

const imageData = fs.readFileSync(path.join(currentDir,'logo.png'));

// Convert the image data to a Base64-encoded data URL
const imageBase64 = Buffer.from(imageData).toString('base64');

const imageUrl = `data:image/png;base64,${imageBase64}`;

export const sendEmail = (student_id,placeholders)=>{
    placeholders.forEach(item=>{
        html = html.replace(item[0],item[1])
    })
    html.replace('${img}',imageUrl)
    const options = {
        from : 'mans.yousef1611@gmail.com',
        to : `${student_id}@eng.asu.edu.eg`,
        subject : ' هلا بالغالي',
        html
    }
    transporter.sendMail(options,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log(info.response)
        }
    })
}