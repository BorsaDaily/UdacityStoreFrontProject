import dotenv from "dotenv";
// enable us to get information from ENV
dotenv.config();
// destructing ENV information
const { ENV, BYCRYPT_PASSWORD, SALT_ROUND, TOKEN_SECRET } = process.env;
// expoting for further usage
export default {
    env: ENV,
    pepper: BYCRYPT_PASSWORD,
    salt: SALT_ROUND,
    tokenSecret: TOKEN_SECRET,
};
