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


// 회원가입 
app.post("/users", async (req, res) => {
  try {
    const me = req.body;
    console.log(me);

    const password = me.password;
    const email = me.email;

    // key error (필수 입력 정보 없을 경우)
    if ( ! nickname || ! password|| ! birthDate || ! email || ! phoneNumber
        || ! gender ) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    // 이메일 중복 확인, 있으면 에러 
    const existingUser = await myDataSource.query(`
    SELECT id, email FROM users WHERE email='${email}';
    `);

    console.log("existing user:", existingUser);
    if (existingUser.length > 0) {
      const error = new Error("이미 존재하는 사용자입니다"); //보안 위해, 이메일 중복임을 밝히지 않음
      error.statusCode = 400;
      throw error;
    }

    // email . @ 필수 포함 정규식 
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      const error = new Error("유효하지 않은 이메일 주소 형식입니다.");
      error.statusCode = 400;
      throw error;
    }

    // 비밀번호 8자리 이상 
    if (password.length < 8) {
      const error = new Error("패스워드는 8자리 이상이어야 합니다");
      error.statusCode = 400;
      throw error;
    }

    // 아이디 : 공백 없는 영문/숫자 포함, 6자리 이상 
    if (userId.length < 6) {
      const error = new Error("아이디는 6자리 이상이어야 합니다");
      error.statusCode = 400;
      throw error;
    }

    if (!/^[a-zA-Z0-9]+$/.test(userId)) {
      const error = new Error('아이디는 영문자와 숫자를 포함해야 합니다.');
      error.statusCode = 400;
      throw error;
    }

    if (!userId.trim()) {
      const error = new Error('사용자 아이디에 공백이 있습니다.');
      error.statusCode = 400;
      throw error;
    }


    // DB에 회원정보 저장 
    const addUser = await myDataSource.query(`
    INSERT INTO users (
      nickName, isCheckedMarketing                   
      password, birthDate,
      email, phoneNumber, gender, profileImage, provider
      )
    VALUES (
      '${nickName}',
      '${isCheckedMarketing}',
      '${password}',
      '${birthDate}',
      '${email}', 
      '${phoneNumber}',
      '${gender}',
      '${profileImage}',
      '${provider}'
      )
    `);

    return res.status(201).json({
      message: "회원가입이 완료되었습니다",
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      message: "회원가입에 실패하였습니다",
    });
  }
});
