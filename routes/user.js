
const userController = require('../controller/userController.js')
const productController = require('../controller/productController.js')
const adminController = require('../controller/adminController.js')
const  adduservali  = require('../validation/auth-validation.js');

const checkAuth = require('../middleware/auth.js');
 const adminAuth = require('../middleware/admin.js')

// router
const router = require('express').Router()


// register-login routers(user)
router.post('/api/register',adduservali.adduservali  ,userController.addUser)

router.post('/api/login', userController.addUserLogin)

router.get('/api/getUsers', userController.getAllUsers)

router.get('/api/getUser/:id', userController.getOneUser)

router.delete('/api/deleteUser/:id', userController.deleteUser)

router.put('/api/updateUser/:id', userController.updateUser)







// product router.....
router.post('/addProduct', productController.addProduct)

router.get('/allProducts',adminAuth.adminauth, productController.getAllProducts)

router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)




// register-login routers(admin)

router.post('/api/loginAdmin', adminController.loginAdmin)



module.exports = router