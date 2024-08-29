//author: mikiashailu and yared tsgie
const adminList = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.split(',') : [];
//admin
exports.isAdmin = (user) => {
  if (adminList.includes(user.email.trim())) {
    return true;
  }
  return false;
};
