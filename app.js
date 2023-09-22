const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 8000);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, _, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: `${err.status ? err.status : ''} ${err.message}`,
  });
});

app.listen(app.get('port'), () => {
  console.log(`listening.... 🦻http://localhost:${app.get('port')}`);
});

//로그인
app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // key error
    if (!email || !password) {
      const error = new Error('필수 입력란을 모두 작성해 주세요');
      error.statusCode = 400;
      throw error;
    }
    // key error 할 수 있지만, 프론트엔드에게 백엔드의 의도를 '친절하게' 알려주기 위해

    // email 이 DB에 있는지 (existing user인지)
    const existingUser = await myDataSource.query(`
    SELECT id, email, password FROM users WHERE email='${email}';
    `);
    console.log('existing user:', existingUser);

    if (existingUser.length === 0) {
      const error = new Error('일치하는 회원정보가 없습니다');
      error.statusCode = 400;
      throw error;
    }

    // 해당 email의 해쉬된 패스워드가 DB에 있는가
    const hashPw = await bcrypt.compare(password, existingUser[0].password);
    console.log(hashPw);


    if (!hashPw) {
      const error = new Error('패스워드가 일치하지 않습니다');
      error.statusCode = 400;
      error.code = 'passwordError';
      throw error;
    }

    // 로그인 성공 시 토큰 발급 
    const token = jwt.sign({ id: existingUser[0].id }, process.env.TYPEORM_JWT);
    return res.status(200).json({
      message: '로그인 성공하였습니다',
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
  }
});v 

const server = http.createServer(app);
const start = async () => {
  try {
    server.listen(8000, () => console.log(`Server is listening on 8000`));
  } catch (err) {
    console.error(err);
  }
};

myDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
});

start();
