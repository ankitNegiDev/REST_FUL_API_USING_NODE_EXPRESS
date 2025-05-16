# `Controller layer`

* when the request comes on this router /:id then the callback function is executing assuming currently there is no validation we applying .. so this callback function is our controller.

```js
userRouter.get('/:id',function callback(req,res){
    console.log("/users/id route");
    // res.send("<h1>hello this is /users/id route </h1>");
    return res.json({
        id:req.params.id,
        user:"bingo",
    })
})
```