const { User } = require('../modules/users/user/user.controllers');

const Secure = async (routePermissions, req) => {
  if (routePermissions.length === 0) return true;

  const token = req.query.access_token || req.headers.access_token;
  if (!token) throw Error('No access token was sent');

  try {
    
    const decoded = await User.validateToken(token);
    const {user, permissions} = decoded;
    return permissions.some((permission)=>routePermissions.includes(permission));
  } catch (e) {
    return false;
  }
};

module.exports = Secure;
