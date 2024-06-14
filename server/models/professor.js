const { Sequelize, DataTypes } = require('sequelize')

module.exports = class Professor extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        p_no: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        p_name: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        dept: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        p_no: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
      },
      {
        sequelize, // 추가된 sequelize 인스턴스
        modelName: 'nodepro', // 모델 이름
        tableName: 'professor', // 테이블 이름
        timestamps: false, // 타임스탬프 필드 비활성화
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    )
  }
  static associate(db) {
    db.Professor.hasMany(db.Student, {
      foreignKey: 'assign',
      sourceKey: 'p_no',
    })
    db.Professor.hasMany(db.Course, {
      foreignKey: 'teach',
      sourceKey: 'p_no',
    })
  }
}
