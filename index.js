const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const User=require('./models/User.js')
const productRoutes = require('./Routes/productRoutes.js')

const server=express()
server.use(cors())
server.use(bodyParser.json())
server.use('/product',productRoutes)
// cpntrol Atlas cloud db

mongoose.connect('mongodb+srv://Prajyot:Prajyot%403030@leadsoft.bsekaje.mongodb.net/?retryWrites=true&w=majority&appName=leadsoft').then(()=>{
    console.log('Database connected')})
.catch((err)=>console.log(err))


server.post('/register',async(req,res)=>{
    try{
        const{fullName,userName,age,password}=req.body
        const userObj=new User(
            {fullName,userName,age,password})
        await userObj.save()
        res.json(
            {
                status:true,
                message:"user registered successfully"
            }
        )

    }
    catch(err)
    {
        res.json({
            status:false,
            message:err
            
        }

        )
    }
}
)

server.post('/login',async(req,res)=>{
    try{
        const{userName,password}=req.body
        const userExist=await User.findOne({userName})
        if(!userExist)
            {
                res.json({
                    status:false,
                    message:"user not found",
            
                    })
            }
                    if(password!==userExist.password)
                    {
                        res.json({
                            status:false,
                            message:"invalid user name or password"
                            })
                    }
                    res.json({
                        status:true,
                        message:"user logged in successfully",

                    })
        }
                            catch(err)
                            {
                                res.json({
                                    status:false,
                                    message:`error :${err}`
                                    })
                            }
                                    }

                            

    


)





server.listen(8085,()=>{
    console.log('Server is running on port 8085')
})
