
const userController = require('../controller/userController.js')
const productController = require('../controller/productController.js')
const adminController = require('../controller/adminController.js')
const  adduservali  = require('../validation/auth-validation.js');
const path = require("path");
const checkAuth = require('../middleware/auth.js');
 const adminAuth = require('../middleware/admin.js');
const multer = require('multer');

// router
const router = require('express').Router()


// register-login routers(user)
router.post('/api/register',adduservali.adduservali,userController.addUser)

router.post('/api/login', userController.addUserLogin)

router.get('/api/getUsers', userController.getAllUsers)

router.get('/api/getUser/:id', userController.getOneUser)

router.delete('/api/deleteUser/:id', userController.deleteUser)

router.put('/api/updateUser/:id', userController.updateUser)

router.put('/api/changePassword/:id', userController.changePassword)

router.post('/api/refresh', userController.refreshToken)







// product router.....
router.post('/addProduct', productController.upload ,productController.addProduct)

router.get('/allProducts',checkAuth.checkauth, productController.getAllProducts)

router.get('/:id',adminAuth.adminauth, productController.getOneProduct)

router.put('/:id',productController.upload,productController.updateProduct)

router.delete('/:id', productController.deleteProduct)




// register-login routers(admin)
router.post('/api/loginAdmin', adminController.loginAdmin)

router.get('/api/getAdmin', adminController.getAdmin)

router.get('/api/getSingleAdmin/:id', adminController.getSingleAdmin)

router.put('/api/updateAdmin/:id', adminController.updateAdmin)

router.delete('/api/deleteAdmin/:id', adminController.deleteAdmin)

router.put('/api/block/:id', adminController.blockUser)

router.put('/api/unBlock/:id', adminController.unBlock)

router.put('/api/madeAdmin/:id', adminController.madeAdmin)

router.put('/api/madeUser/:id', adminController.madeUser)












module.exports = router