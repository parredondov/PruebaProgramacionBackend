/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {
  let token;

  debugger
  if (req.headers && req.headers.token) {
    token = req.headers.token;
    console.log(token);
    if (token.length <= 0) return res.unauthorized();

  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.unauthorized();
  }
  sails.helpers.jwtVerify(token, function (err, token) {
    //console.log(err);
    if (err) return res.unauthorized();
    req.token = token; // This is the decrypted token or the payload you provided
    next();
  });


};
