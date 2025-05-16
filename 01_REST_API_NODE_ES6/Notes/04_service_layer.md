# `Service layer`

* mainly service layer is for business logic.. so our logic will be simple to prevent any blocked word as username and hobby its a just simple loigc that we will implement during the creation of user data.

* since we are not having any db connection so ... so anything or any data that we want we will directly import the data.json file into service layer and from here we will write the logic...
* by doing this ... routing layer will handel routing logic, validation layer will handel validation logic, and controller will be our function.. and controller will connect to service layer..
* so the flow will be `routing -> vlaidation -> controller -> service`

* now assume that our custom array where we are storing the data is for now a database so we do querying logic in repository layer .. that measn from service layer we will call rpository layer..
