export const FBAuth = (req, res, next) => {
  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found.')
    return res.status(403).json({error: "Unauthorized"})
  }

  adminFirebaseAuth
  .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      console.log(decodedToken);
      return next();
    })
    .catch((err) => {
      console.error('Error while verifying token.')
      return res.status(403).json(err);
    });
}