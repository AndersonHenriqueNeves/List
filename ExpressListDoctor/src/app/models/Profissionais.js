import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs'; 

class Profissionais extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      lastname: Sequelize.STRING,
      specialty: Sequelize.STRING,
      city: Sequelize.STRING,
      number: Sequelize.STRING,
      email: Sequelize.STRING,
      password_hash: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      record: Sequelize.STRING,
      description: Sequelize.STRING,
      disabled: Sequelize.BOOLEAN,
      passwordResetToken: Sequelize.STRING,
      passwordResetExpires: Sequelize.DATE,
    },{
      sequelize
    });
    this.addHook('beforeSave', async (professional) => {
      if (professional.password) {
        professional.password_hash = await bcrypt.hash(professional.password, 8);
      }
    });

    return this;
  }
  
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsToMany(models.Payment, { foreignKey: 'professional_id', through: 'paymentsprofissional', as: 'payments' });
  }
  

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Profissionais;