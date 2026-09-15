// Run once after downloading a Firebase service-account JSON key.
// Usage: node scripts/grant-admin.js your-google-email@gmail.com path/to/service-account.json
const admin=require('firebase-admin');
const [email,keyPath]=process.argv.slice(2);
if(!email||!keyPath){console.error('Usage: node scripts/grant-admin.js EMAIL SERVICE_ACCOUNT_JSON');process.exit(1)}
const serviceAccount=require(require('path').resolve(keyPath));
admin.initializeApp({credential:admin.credential.cert(serviceAccount)});
admin.auth().getUserByEmail(email).then(async user=>{
  await admin.auth().setCustomUserClaims(user.uid,{...(user.customClaims||{}),admin:true});
  console.log(`Admin role granted to ${email}. Sign out and sign in again.`);
}).catch(error=>{console.error(error.message);process.exit(1)});
