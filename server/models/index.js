const Sequelize = require('sequelize')
const process = require('process')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
const db = {}
const User = require('./user')
const Professor = require('./professor')
const Student = require('./student')
const Course = require('./course')
const Enroll = require('./enroll')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

// 각 모델 초기화 및 관계 설정
const init = async () => {
  try {
    // 모델 불러오기
    db.sequelize = sequelize
    db.User = User
    db.Professor = Professor
    db.Student = Student
    db.Course = Course
    db.Enroll = Enroll

    // 각 모델 초기화
    await User.init(sequelize)
    await Professor.init(sequelize)
    await Student.init(sequelize)
    await Course.init(sequelize)
    await Enroll.init(sequelize)
    // 각 모델간 관계 설정
    Object.values(db).forEach((model) => {
      if (model.associate) {
        model.associate(db)
      }
    })
    console.log(User)
    console.log(Professor)

    console.log('모든 모델 초기화 및 관계 설정 완료')
  } catch (error) {
    console.error('모델 초기화 중 오류 발생:', error)
  }
}

// init 함수 호출하여 초기화 시작
init()

module.exports = db
