module.exports = (req, res) => {
  const token = req.cookies.nekot
  if (!token) return res.status(404).json({msg: 'no recent log in'})

  res.status(200).json({token:token})
}