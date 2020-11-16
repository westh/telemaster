export default func => async (req, res, next) => {
  try {
    await func(req, res, next)
  }
  catch (error) {
    next(new Error(error))
  }
}