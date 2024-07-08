const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID='FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0lsNkNMV2dpSGZGZ1JXT05KUVZ6ZWRCMzJTY3RIK01JSXRRcGU2dXVHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVEZ4M1NNZzRwY05jVWFSYWc2VHM4M01kVmdtanNLRDZ5NlY0SGw2bStTQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SGQxWnpTcVk0bnBpWTZseUhBbFBBdHNLT251WU53SnUxYjhoYlIvU0ZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzeTRiREdFQW9QRjhIcGtEM25LRVh1S1dGSUQ0MjJaNUY4UURDQnJETW5BPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVEWWZ0VFo1VTRyRUxSVGZPL1BrZmNCck9rOWRKSnorclRudE9oMFc3bDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVwejU5Sk5JaklWYUg1bzdsUHlla2JleXZuby9VT0lhb3NSbXE4cmZMaFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUdOSS94ajNiMGlHMVgwMzdEVkI1TVFuTGk5akNsY3RFeVMyVmJJZGExST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN1hkc0cyc0diVTlsaHhvSXNUcUdoSUdQd083cDhUVWc2VnZHT0U1Qytncz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJxZTlPMGRqeThDS0o4US9Wd0x1SWhYckNUYVRRY1R1eTFmNTgrdDdYb1VQLzV2QXN6WmhMYkovU3ZLSEhuZjY2OE1SYXViYUYxcW9JNGJtUGZkMmlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzgsImFkdlNlY3JldEtleSI6Ikw5TUlFaG5EOHNXaXBhMnE0cFlWd0YxWjFLUEJPT2FKUUQwN0hhOXlHOFE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjo2MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ikx3UGdkZVlzU2VxQ2szVU02QUxKd0EiLCJwaG9uZUlkIjoiMmQ3ZmRkY2MtZjI0NS00MjA1LWJjODUtNGMxMTczMjVjOWI2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJ6VkVKZWVBcm9RdW9mTG9xdEdaWDIvT0lFbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTK0IrRWxQcWdEWWE0UTZENkREME5nRVFDMjA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWkRFWjdLTFMiLCJtZSI6eyJpZCI6IjIzMzUwODc3NjY1ODoyM0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiI0UEYgQXJpem9uYSDwnZGo8J2Rq/CdkboifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0x2TmxwOERFUEt3c2JRR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkxZQTgxaTZrYURJUEdta1dyT0ljYStJekJURkNoK3ZZamo5U2pjMFVtMjA9IiwiYWNjb3VudFNpZ25hdHVyZSI6InZjSTRFUHZXNmlVRW0xd2I0UFVZeEJLRVprM055RXhLTjdKSzJnTjYvUzBoQ2NrUFhCVTNTbnd2ZnFSd0gyZUdnb3MxRmlvaXVvUDVHbVBiazFySGpRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ5aURhTVFQeTR5Y0NJTmF6ZGpmY2c0bUd4cmh1SGsyTHNFdHo1bTVTUFI4WlZETWlWWFhPaG0veTlqUGIzZmw5OFYxVDJRa3JqVXZCWTdEOU91UUNqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzUwODc3NjY1ODoyM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTMkFQTll1cEdneUR4cHBGcXppSEd2aU13VXhRb2ZyMkk0L1VvM05GSnR0In19XSwicGxhdGZvcm0iOiJzbWJpIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwNDczNzI3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZIaiJ9'
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "233508776658", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
