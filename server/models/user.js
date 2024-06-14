const { Sequelize, DataTypes } = require('sequelize')

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        nick: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
      },
      {
        sequelize, // 추가된 sequelize 인스턴스
        modelName: 'nodepro', // 모델 이름
        tableName: 'user', // 테이블 이름
        timestamps: false, // 타임스탬프 필드 비활성화
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    )
  }
}
