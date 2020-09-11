const nodemailer = require('nodemailer');
const path = require('path');
const isProd = process.env.NODE_ENV === 'prod';

module.exports = {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
        session: false
    },
    PAGINATION_PERPAGE: 10,
    android_serverKey: 'AAAA--U1itk:APA91bHrb92x3pImrnrbEungvULxPJhYLxagXWEs2m-6YpuJacjSrgwqhlTgii-Q-2em6KGfDRdg253cuzy7L7SUqnCNuVwUDY_AQUb707GS1-Pq7HsjDUM-EW5BM6_DsIcZcDdk6hWc',
    ios_key: path.join(__dirname, '/key_file/AuthKey_7XGMBSUZ7H.p8'),
    ios_keyId: '7XGMBSUZ7H',
    ios_teamId: 'H23W3EERLK',
    isProd,
    getPort: process.env.PORT || 1415,
    getAdminFolderName: process.env.ADMIN_FOLDER_NAME || 'admin',
    getApiFolderName: process.env.API_FOLDER_NAME || 'api',
    getAgentFolderName: process.env.AGENT_FOLDER_NAME || 'agent',
    nonSecurePaths: ['/vehicleOwner/reset-password', '/vehicleOwner/login', '/vehicleOwner/store', '/vehicleOwner/verify', '/vehicleOwner/resendOtp'],
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        }
    }),
    STRIPE_SK: process.env.STRIPE_SK,
    ORDER_RECEIVE_MAIL: 'test@yopmail.com, ron@yopmail.com',

    // aws.config.update({
    //     accessKeyId: config.AWS_ACCESS_KEY,
    //     secretAccessKey:  config.AWS_SECRET_KEY,
    // });

    // s3 = new aws.S3();
    // ios_key: '../../../key_file/AuthKey_7XGMBSUZ7H.p8',
    // stripe_pub_key: 'pk_test_CbyKB49tW4HK64CWeGhhOKgm',
    // stripe_secret_key: 'sk_test_WyhzyGDgDUnAkVqI6yFAVXE6',
    // AWS_BUCKET:'',
    // AWS_ACCESS_KEY:'',
    // AWS_SECRET_KEY:'',
    // FIREBASE_APIKEY: 'AIzaSyBgOZ79QLBdvRMqbuovyDpSBh6fl10P994',
    // FIREBASE_AUTHDOMAIN: 'locqum-7c349.firebaseapp.com',
    // FIREBASE_DATABASE_URL: 'https://locqum-7c349.firebaseio.com',
    // FIREBASE_PROJECTID: 'locqum-7c349',
    // FIREBASE_STORAGE_BUCKET: 'locqum-7c349.appspot.com  ',
    // FIREBASE_MESSEGING_SENDERID: '953751063004',
    //FIREBASE_APPID: "1:953751063004:web:1f7dd2784a290e8833a719",

    // s3: new aws.S3()

}