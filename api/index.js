import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();
app.use(cors({
    origin: ['http://localhost:5174'], //replace with frontend port number
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads');
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now()+ file.originalname);
    }
  })
const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});

const profilePicStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,'../client/public/profilepics');
  },
  filename: function(req, file, cb) {
    cb(null,"User"+Date.now()+file.originalname);
  }
})
const uploadProfilePic = multer({storage: profilePicStorage});
app.post('/api/uploadprofilepic',uploadProfilePic.single('file'), function(req,res) {
  const file = req.file;
  res.status(200).json(file.filename);
});


app.use("/api/posts",postRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

app.listen(2002,()=>{
    console.log('server is running on port 2002');
})