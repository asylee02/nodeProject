const { Sequelize, DataTypes } = require('sequelize')

module.exports = class Enroll extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        c_no: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'course',
            key: 'c_no',
          },
        },
        s_no: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'student',
            key: 's_no',
          },
        },
        score: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        grade: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
      },
      {
        sequelize, // 추가된 sequelize 인스턴스
        modelName: 'nodepro', // 모델 이름
        tableName: 'enroll', // 테이블 이름
        timestamps: false, // 타임스탬프 필드 비활성화
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    )
  }
  static associate(db) {
    db.Enroll.belongsTo(db.Student, {
      foreignKey: 'student',
      targetKey: 's_no',
    })
    db.Enroll.belongsTo(db.Course, {
      foreignKey: 'enroll',
      targetKey: 'c_no',
    })
  }
}
