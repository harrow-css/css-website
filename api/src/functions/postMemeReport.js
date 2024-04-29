const { app } = require('@azure/functions');
const MongoClient = require('mongodb').MongoClient
// require dotenv
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = 'test'

var nodemailer = require('nodemailer')

var ObjectId = require('mongodb').ObjectId;

let cachedDb = null

const connectToDatabase = async (uri) => {
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  })

  cachedDb = client.db(DB_NAME)

  return cachedDb
}

app.http('postMemeReport', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (event, context) => {
    // otherwise the connection will never complete, since
    // we keep the DB connection alive
    context.callbackWaitsForEmptyEventLoop = false
  
    const db = await connectToDatabase(MONGODB_URI)
  
    // get query string parameter called 'data'
    const data = JSON.parse(event.body)
  
    data['type'] = 'memeReport'
    data['timestamp'] = new Date()
  
    // post the data to the database under the collection 'forms'
    const result = await db.collection('forms').insertOne(data)
  
    // search for the meme in the database with _id = data[memeid]
    const memedetails = await db.collection('memes').find({ "_id": ObjectId(data['memeid']) }).toArray()
  
    var transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAILUSERNAME,
        pass: process.env.EMAILPASSWORD,
      },
    })
  
    // admin user email change here
    let email = await transporter.sendMail({
      from: 'The Harrow School CSS Team <harrowschoolcss@outlook.com> ',
      to: '19kainthd@Harrowschool.org.uk',
      subject: 'A meme report has been submitted',
      replyTo: '19kainthd@Harrowschool.org.uk',
      priority: 'high',
      name: 'The Harrow School CSS Team',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html>
    
    <head>
      <!-- Compiled with Bootstrap Email version: 1.3.0 -->
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <style type="text/css">
        body,
        table,
        td {
          font-family: Helvetica, Arial, sans-serif !important
        }
    
        .ExternalClass {
          width: 100%
        }
    
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 150%
        }
    
        a {
          text-decoration: none
        }
    
        * {
          color: inherit
        }
    
        a[x-apple-data-detectors],
        u+#body a,
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit
        }
    
        img {
          -ms-interpolation-mode: bicubic
        }
    
        table:not([class^=s-]) {
          font-family: Helvetica, Arial, sans-serif;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-spacing: 0px;
          border-collapse: collapse
        }
    
        table:not([class^=s-]) td {
          border-spacing: 0px;
          border-collapse: collapse
        }
    
        @media screen and (max-width: 600px) {
    
          .w-full,
          .w-full>tbody>tr>td {
            width: 100% !important
          }
    
          .w-8,
          .w-8>tbody>tr>td {
            width: 32px !important
          }
    
          .h-8,
          .h-8>tbody>tr>td {
            height: 32px !important
          }
    
          *[class*=s-lg-]>tbody>tr>td {
            font-size: 0 !important;
            line-height: 0 !important;
            height: 0 !important
          }
    
          .s-2>tbody>tr>td {
            font-size: 8px !important;
            line-height: 8px !important;
            height: 8px !important
          }
    
          .s-3>tbody>tr>td {
            font-size: 12px !important;
            line-height: 12px !important;
            height: 12px !important
          }
    
          .s-5>tbody>tr>td {
            font-size: 20px !important;
            line-height: 20px !important;
            height: 20px !important
          }
    
          .s-10>tbody>tr>td {
            font-size: 40px !important;
            line-height: 40px !important;
            height: 40px !important
          }
        }
      </style>
    </head>
    
    <body class="bg-secondary"
      style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #fffbfe; margin: 0; padding: 0; border-width: 0;"
      bgcolor="#fffbfe">
      <table class="bg-secondary body" valign="top" role="presentation" border="0" cellpadding="0" cellspacing="0"
        style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #fffbfe; margin: 0; padding: 0; border-width: 0;"
        bgcolor="#fffbfe">
        <tbody>
          <tr>
            <td valign="top" style="line-height: 24px; font-size: 16px; margin: 0;" align="left" bgcolor="#fffbfe">
              <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tbody>
                  <tr>
                    <td align="center" style="line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;">
                      <!--[if (gte mso 9)|(IE)]>
                          <table align="center" role="presentation">
                            <tbody>
                              <tr>
                                <td width="600">
                        <![endif]-->
                      <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0"
                        style="width: 100%; max-width: 600px; margin: 0 auto;">
                        <tbody>
                          <tr>
                            <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                              <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0"
                                style="width: 100%;" width="100%">
                                <tbody>
                                  <tr>
                                    <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;"
                                      align="left" width="100%" height="40">
                                      &#160;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="card  bg-light" role="presentation" border="0" cellpadding="0" cellspacing="0"
                                style="border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;"
                                bgcolor="#f7fafc">
                                <tbody>
                                  <tr>
                                    <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left"
                                      bgcolor="#393939">
                                      <table class="card-body" role="presentation" border="0" cellpadding="0"
                                        cellspacing="0" style="width: 100%;">
                                        <tbody>
                                          <tr>
                                            <td
                                              style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 20px;"
                                              align="left">
                                              <div class="row" style="margin-right: -24px;">
                                                <table class="" role="presentation" border="0" cellpadding="0"
                                                  cellspacing="0" style="table-layout: fixed; width: 100%;" width="100%">
                                                  <tbody>
                                                    <tr>
                                                      <td class="col-11"
                                                        style="line-height: 24px; font-size: 16px; min-height: 1px; font-weight: normal; padding-right: 24px; width: 91.666667%; margin: 0;"
                                                        align="left" valign="top">
                                                        <h1 class="h3"
                                                          style="padding-top: 0; padding-bottom: 0; font-weight: 00; vertical-align: baseline; font-size: 30px; line-height: 35.0px; margin: 0;"
                                                          align="left">The Computer Science Society.</h1>
                                                        <table class="s-2 w-full" role="presentation" border="0"
                                                          cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;"
                                                                align="left" width="100%" height="8">
                                                                &#160;
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                      <td class="col-1"
                                                        style="line-height: 24px; font-size: 16px; min-height: 1px; font-weight: normal; padding-right: 24px; width: 8.333333%; margin: 0;"
                                                        align="left" valign="top">
                                                        <img class="w-8 h-8"
                                                          src="https://i.ibb.co/17q2prv/templogowhite-1eaa1b4.png"
                                                          style="height: 32px; line-height: 100%; outline: none; text-decoration: none; display: block; width: 32px; border-style: none; border-width: 0;"
                                                          width="32" height="32">
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                              <h5 class="text-teal-700"
                                                style="color: #fffbfe; padding-top: 0; padding-bottom: 0; font-weight: 500; vertical-align: baseline; font-size: 20px; line-height: 24px; margin: 0;"
                                                align="left">Form Submission Confirmation</h5>
                                              <table class="s-5 w-full" role="presentation" border="0" cellpadding="0"
                                                cellspacing="0" style="width: 100%;" width="100%">
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;"
                                                      align="left" width="100%" height="20">
                                                      &#160;
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
    
                                            
    
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
    
                                  
                                </tbody>
                              </table>
                              
                              <br> 
                              <table class="card  bg-light" role="presentation" border="0" cellpadding="0" cellspacing="0"
                              style="border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;"
                              bgcolor="#f7fafc">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left"
                                    bgcolor="#7a7d7d">
                                    <table class="card-body" role="presentation" border="0" cellpadding="0"
                                      cellspacing="0" style="width: 100%;">
                                      <tbody>
                                        <tr>
                                          <td
                                            style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 20px;"
                                            align="left">
    
    
    
                                            <div class="space-y-3">
                                              <p class="text-gray-700"
                                                style="line-height: 24px; font-size: 16px; color: #fffbfe; width: 100%; margin: 0;"
                                                align="left">
                                                Hey, so there's a meme thats been reported. Here's the rundown.
  
                                                <img src="https://ucarecdn.com/${data.imageid}/" /> 
                                                  <br>
                                                  <br>
                                                  <p>The meme id is <b>${data.memeid}</b></p>
                                                  
                                                  <p>The meme was with comments <b>${data.comments}</b></p>
                                                  
                                                  <p>The meme was reported by <b>${data.user.name}, ${data.user.email}</b></p>
  
                                                  <p>The topic is <b>${ memedetails[0].round.topic }</b></p>
                                                  <p>It's a meme by <b>${ memedetails[0].user.name}, ${memedetails[0].user.email}</b></p>
  
                                                  <a href="http://localhost:8888/.netlify/functions/postBanMeme?memeid=${ data.memeid}">Click Here to Ban it using devserver</a>
                                                  <a href="https://css.harrowschool.io/.netlify/functions/postBanMeme?memeid=${ data.memeid}">Click Here to Ban it using production</a>
                                              </p>
    
                                              <table class="s-3 w-full" role="presentation" border="0" cellpadding="0"
                                                cellspacing="0" style="width: 100%;" width="100%">
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;"
                                                      align="left" width="100%" height="12">
                                                      &#160;
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
    
                                
                              </tbody>
                            </table>
    
                              <div class="footer" style="text-align: center;font-size: 12px;color: #888;">
                                <p>
                                  You received this email because you're a member of the Computer Science Society.
                                </p>
                            
    
                              </div>
    
                              <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0"
                                style="width: 100%;" width="100%">
                                <tbody>
                                  <tr>
                                    <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;"
                                      align="left" width="100%" height="40">
                                      &#160;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                        <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
    
    </html>`,
    })
  
    return {
      statusCode: 200,
    }
  }
  
});

