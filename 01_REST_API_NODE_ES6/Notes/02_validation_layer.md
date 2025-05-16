# `Validation Layer`

* now when we are creating the user then we need to validate that the user body or request body is not empty. otherwise how we will create the user.
* so for this we will create a seprate validation layer..
* now we can apply validation either by writing manual validation or either we can use any other thirdparty library like `zod` [zod npm link](https://www.npmjs.com/package/zod)
* now validators are also middle ware nothing else .. because we want when the request comes first it validate and then move to controller.

* ## `middleware`

  * middleware are nothing but a normal function that have access to request object , response and access of next middleware.

* to register this validation we need to register it in routes layer before it re-direct to controller.
* but if we want to do validation with zod then we can also do it .. but keep in mind these validation that we are doing we are doing it at request level not on database level.
