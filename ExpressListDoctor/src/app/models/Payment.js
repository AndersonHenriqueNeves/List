import Sequelize, { Model } from 'sequelize';

class Payment extends Model {
  static init(sequelize) {
    super.init({
      type: Sequelize.STRING,
    },{
      sequelize
    });
    return this;
  }
  static associate(models) {
    this.belongsToMany(models.Profissionais, { foreignKey: 'payment_id', through: 'paymentsprofissional', as: 'profissionais' });
  }
}

export default Payment;