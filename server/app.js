//  고급웹프로그래밍 과제#3 이상연 60211684
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const loginRouter = require('./routes/login')
const authRouter = require('./routes/auth')
const kakao = require('./passport/kakaoStrategy')
const passport = require('passport')
const { sequelize } = require('./models')

const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const fs = require('fs')

dotenv.config() // .env 파일의 환경 변수 설정
const { PORT, COOKIE_SECRET } = process.env
const app = express()

app.set('port', PORT || 3000) // 포트 설정

// 업로드 디렉토리가 없으면 생성
try {
  fs.readdirSync('./uploads')
} catch (error) {
  console.log('upload 파일이 없어서 파일 생성')
  fs.mkdirSync('uploads')
}

// 미들웨어 설정
app.use(morgan('dev')) // 요청 로깅 미들웨어
app.use(express.static(path.join(__dirname, 'public'))) // 정적 파일 제공
app.use(express.json()) // JSON 요청 파싱
app.use(express.urlencoded({ extended: false })) // URL-encoded 요청 파싱
app.use(cookieParser(COOKIE_SECRET))

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('✅ DB Connected!')
  })
  .catch((err) => {
    console.error(err)
  })
// 세션 설정
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60000 * 30, // 세션 쿠키 유효 기간 (30분)
    },
    name: 'my-session-cookie',
  })
)

// 라우터 설정
app.use('/', loginRouter)
app.use('/auth', authRouter)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((token, done) => {
  done(null, token)
})

passport.deserializeUser((token, done) => {
  // 토큰을 이용하여 사용자를 인증 또는 사용자 정보를 가져오는 로직 구현
  // 예시: 토큰에서 userId를 추출하여 사용자 정보를 가져옴
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const userId = decoded.userId
  Users.findByPk(userId)
    .then((user) => {
      done(null, user) // 사용자 객체를 세션에서 가져옴
    })
    .catch((err) => {
      done(err)
    })
})

kakao() // kakaoStrategy.js의 module.exports를 실행합니다.

// 404 에러 처리 미들웨어
app.use((req, res, next) => {
  res.status(404).send(`${req.method} ${req.path} is NOT FOUND`)
})

// 서버 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Something broke!')
})

// 서버 시작
app.listen(app.get('port'), () => {
  console.log(`http://localhost:${app.get('port')} 대기중`)
})
