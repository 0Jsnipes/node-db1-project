const router = require('express').Router()
const md = require('./accounts-middleware.js')
const Account = require('./accounts-model.js')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)

  }catch(err){
    next(err)
  }
  // DO YOUR MAGIC

})

router.get('/:id',md.checkAccountId , async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id0)
    res.json(account)
  }catch(err){
    next(err)
  }
  // DO YOUR MAGIC
})

router.post(
  '/', 
  md.checkAccountPayload, 
  md.checkAccountNameUnique,
  async (req, res, next) => {
  try {
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
  // DO YOUR MAGIC
})

router.put(
  '/:id',
   md.checkAccountId, 
   md.checkAccountPayload, 
   md.checkAccountNameUnique, 
   (req, res, next) => {
  try {

  }catch(err){
    next(err)
  }
  // DO YOUR MAGIC
});

router.delete(
  '/:id',
  md.checkAccountId,
   async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  }catch(err){
    next(err)
  }
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status|| 500).json({
    message: err.message,
  })
  // DO YOUR MAGIC
})

module.exports = router;
