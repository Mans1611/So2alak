

import B2 from 'backblaze-b2';
import dotenv from 'dotenv'

dotenv.config();

const b2 = new B2({
    applicationKeyId: process.env.BUCKET_KEY_ID, 
    applicationKey: process.env.BUCKET_APPLICATION_KEY, 
});
export default b2;