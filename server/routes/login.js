//  고급웹프로그래밍 과제#2 이상연 60211684
const express = require('express')
const path = require('path')
const passport = require('passport')
const router = express.Router()

// 루트 URL 요청 시 /login으로 리다이렉트
router.get('/', (req, res) => {
  res.redirect('/login')
})

// /login 경로에 대한 GET 및 POST 요청 처리
router
  .route('/login')
  .get((req, res) => {
    // GET 요청: 로그인 페이지 렌더링
    console.log('login')
    const username = req.session.userid
    console.log(username)
    res.render('login', { title: '로그인', name: username })
  })
  .post((req, res) => {
    // POST 요청: 로그인 처리
    const id = req.body.login
    const pw = req.body.password
    console.log(req.query)
    console.log(req.body)

    // 로그인 인증
    if (id === 'staff' && pw === 'staff') {
      req.session.userid = id
      res.render('login', { title: 'Login', name: id })
    } else {
      res.status(401).render('login', {
        title: 'Login',
        error: '잘못된 사용자명 또는 비밀번호입니다.',
      })
    }
  })

router.get(`/kakao`, passport.authenticate('kakao'))

// 오류 처리 미들웨어 추가
router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('서버 에러가 발생했습니다!')
})

module.exports = router
