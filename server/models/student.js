const { Sequelize, DataTypes } = require('sequelize')

module.exports = class Student extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        s_no: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        s_name: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        dept: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_no: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'professor', // 참조하는 모델 (소문자로 변경)
            key: 'p_no', // 참조하는 모델의 키
          },
        },
      },
      {
        sequelize, // 추가된 sequelize 인스턴스
        modelName: 'nodepro', // 모델 이름
        tableName: 'student', // 테이블 이름
        timestamps: false, // 타임스탬프 필드 비활성화
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    )
  }
  static associate(db) {
    db.Student.hasMany(db.Enroll, { foreignKey: 'student', sourceKey: 's_no' })
    db.Student.belongsTo(db.Professor, {
      foreignKey: 'assign',
      targetKey: 'p_no',
    })
  }
}
