import Sequelize from 'sequelize';


import databaseConfig from '../config/database';

import User from '../app/models/User';
import UserPhone from '../app/models/UserPhone';
import Profissional from '../app/models/Profissionais';
import File from '../app/models/File';
import Office from '../app/models/Office';
import Service from '../app/models/Service';
import Payment from '../app/models/Payment';

const connection = new Sequelize(databaseConfig);

User.init(connection);
UserPhone.init(connection);
Profissional.init(connection);
File.init(connection);
Office.init(connection);
Service.init(connection);
Payment.init(connection);

User.associate(connection.models);
UserPhone.associate(connection.models);
Profissional.associate(connection.models);
Office.associate(connection.models);
Service.associate(connection.models);
Payment.associate(connection.models);

module.exports = connection;

