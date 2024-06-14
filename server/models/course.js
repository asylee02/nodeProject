const { Sequelize, DataTypes } = require('sequelize')

module.exports = class Course extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        c_no: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        c_dept: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        p_no: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'professor',
            key: 'p_no',
          },
        },
        credit: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        room: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
      },
      {
        sequelize, // 추가된 sequelize 인스턴스
        modelName: 'nodepro', // 모델 이름
        tableName: 'course', // 테이블 이름
        timestamps: false, // 타임스탬프 필드 비활성화
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    )
  }
  static associate(db) {
    db.Course.belongsTo(db.Professor, {
      foreignKey: 'teach',
      targetKey: 'p_no',
    })
    db.Course.hasMany(db.Enroll, {
      foreignKey: 'enroll',
      sourceKey: 'c_no',
    })
  }
}
