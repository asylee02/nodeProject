const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy
const jwt = require('jsonwebtoken')
const db = require('../models/index')
module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const user_id = profile._json.id
        const nickname = profile._json.properties.nickname
        const token = accessToken
        console.log(user_id, nickname)
        try {
          const exUser = await db.User.findOne({
            where: {
              user_id: user_id,
            },
          })
          const data = { name: nickname, token: token }
          if (!exUser) {
            console.log('db등록')
            // 새로운 사용자일 경우
            const newUser = await db.User.create({
              user_id: user_id,
              nick: nickname,
            })
            done(null, data)
            console.log(newUser)
          } else {
            console.log('이미 있는 회원입니다.')
            done(null, data)
          }
        } catch (error) {
          console.error(error)
          done(error)
        }
      }
    )
  )
}
