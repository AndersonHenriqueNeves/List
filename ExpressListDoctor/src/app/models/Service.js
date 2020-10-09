import Sequelize, { Model } from 'sequelize';

class Service extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      price: Sequelize.DOUBLE,
    },{
      sequelize
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Profissionais, { foreignKey: 'professional_id' });
  }
}

export default Service;