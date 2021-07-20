import {
	WASABI_ACCESS_KEY_ID, 
	WASABI_SECRET_ACCESS_KEY, 
	WASABI_DEFAULT_REGION, 
	WASABI_BUCKET,
	WASABI_URL
} from '@env'

var AWS = require('aws-sdk');

var wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');

var s3 = new AWS.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: WASABI_ACCESS_KEY_ID,
    secretAccessKey: WASABI_SECRET_ACCESS_KEY
});

const ShowFile = ({bucket, key}: any) =>{
    var params = {
        Bucket: `${bucket}`,
        Key: `photo1`
    };

    s3.getObject(params, function(err: any, data: any) {
        if (!err) {
            console.log(data); // successful response
            return data
         } else {
             console.log(err); // an error occurred
             return err
         }     
     
     });
}


export {
    ShowFile,
}