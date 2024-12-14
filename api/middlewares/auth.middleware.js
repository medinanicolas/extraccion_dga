function authenticate(req, res, next) {

  // Your JWT implementation goes here
  let authenticated = true;

  if (!authenticated) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

module.exports = {
  authenticate,
};
