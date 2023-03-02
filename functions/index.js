//Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');
const admin = require("firebase-admin");
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});


admin.initializeApp(functions.config().firebase);

exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {

        /* gmail  credentials */
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'fahadtahir94@gmail.com'
        }
    });
    const mailOptions = {
        from: `fahadtahir94@gmail.com`,
        to: `fahadtahir94@gmail.com`,
        subject: 'Email From Customer',
        html: `<h1>Contact Form Message</h1>
                            <p>
                               <b>Email: </b>${req.body.email}<br>
                               <b>Name: </b>${req.body.name}<br>
                               <b>Message: </b>${req.body.message}<br>
                            </p>`
    };
    return transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
            return res.send(error.toString());
        }
        var datas = JSON.stringify(data)
        return res.send(`Sent!`);
    });
});


exports.save = functions.https.onRequest(async (req, res) => {

    cors(req, res, async () => {
        const db = admin.firestore();
        const data = JSON.parse(req.body.data);
          
        // Add a new document in collection "cities" with ID 'LA'
        const rest = await db.collection('digital').doc(makeid()).set(data);
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send('Sent !');    
    })

});


function makeid() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 11) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
