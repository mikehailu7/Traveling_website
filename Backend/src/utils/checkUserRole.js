const adminList = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.split(',') : [];

exports.isAdmin = (user) => {
  if (adminList.includes(user.email.trim())) {
    return true;
  }
  return false;
};
