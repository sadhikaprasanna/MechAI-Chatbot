import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT=process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
        app.listen(PORT, () =>
            console.log("Server open & Connected to Database")
        );
    })
    .catch((err) => console.log(err));

// GET
// PUT
// POST
// DELETE   


/*        ------   how the backend requests work -------
//to get the data in our output--get
app.get("/hello",(req,res,next)=>{
    return res.send("hello");//shows in postman
});

//to send data--post
app.post("/hello",(req,res,next)=>{ 
    console.log(req.body.name); //sends name from body and shows in the console of vscode
    return res.send("hello");
});

//put - to modify data from frontend
---------------------------------------------------------------
*/


//connections and listeners
//app.listen(5000,() => console.log("Server Open"));