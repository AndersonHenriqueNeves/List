import User from '../models/User';
import crypto from 'crypto';
import mailer from '../../modules/mailer';
import validateCpf from '../../utils/validateCpf';

class UserController {
  async store(req, res) {
    const userExists  = await User.findOne({ where: { email: req.body.email } });
 
    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
      return res.status(401).json({ error: 'O campo de Nome é obrigatório'});
    }

    if(!req.body.numberphone || typeof req.body.numberphone == undefined || req.body.numberphone == null) {
      return res.status(401).json({ error: 'O Número de celular é obrigatório'});
    }

    if(req.body.numberphone.length > 11 ) {
      return res.status(401).json({ error: 'A quantidade de números do telefone não pode ser maior que 11'});
    }

    if(!validateCpf(req.body.cpf)) {
      return res.status(401).json({ error: 'CPF inválido'});
    }

    if(!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null) {
      return res.status(401).json({ error: 'O campo de CPF é obrigatório'});
    }

    if(!req.body.cep || typeof req.body.cep == undefined || req.body.cep == null) {
      return res.status(401).json({ error: 'O campo de CEP é obrigatório'});
    }

    if(!req.body.city || typeof req.body.city == undefined || req.body.city == null) {
      return res.status(401).json({ error: 'O campo de Cidade é obrigatório'});
    }

    if(!req.body.uf || typeof req.body.uf == undefined || req.body.uf == null || req.body.uf == "Selecionar") {
      return res.status(401).json({ error: 'A UF é obrigatória'});
    }

    if(req.body.uf.length < 2 || req.body.uf.length > 2) {
      return res.status(401).json({ error: 'A UF tem que ter 2 Caracteres'});
    }

    if(!req.body.neighborhood || typeof req.body.neighborhood == undefined || req.body.neighborhood == null) {
      return res.status(401).json({ error: 'O Bairro é obrigatório'});
    }

    if(!req.body.street || typeof req.body.street == undefined || req.body.street == null) {
      return res.status(401).json({ error: 'A Rua é obrigatória'});
    }

    if(!req.body.number || typeof req.body.number == undefined || req.body.number == null) {
      return res.status(401).json({ error: 'O número é obrigatório'});
    }

    if(!req.body.complement || typeof req.body.complement == undefined || req.body.complement == null) {
      return res.status(401).json({ error: 'O complemento é obrigatório'});
    }

    if(!req.body.reference || typeof req.body.reference == undefined || req.body.reference == null) {
      return res.status(401).json({ error: 'A Referência é obrigatória'});
    }

    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
      return res.status(401).json({ error: 'A Senha é obrigatória'});
    }

    if(req.body.password.length < 6) {
      return res.status(401).json({ error: 'O campo senha tem que ter no mínimo 6 caracteres'});
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
      return res.status(401).json({ error: 'O email é obrigatório'});
    }

    if(userExists) {
      return res.status(400).json({ error: 'User already exists'});
    }
    
    const cpfExists = await User.findOne({ where: { cpf: req.body.cpf }});

    if(cpfExists) {
      return res.status(400).json({ error: 'CPF já cadastrado'})
    }
    
    const {id, name, email }= await User.create(req.body);
    
    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

  //   if(email !== user.email) {
  //     const userExists  = await User.findOne({ where: { email } });

  //     if(userExists) {
  //       return res.status(400).json({ error: 'Email já cadastrado'});
  //     }
  //   }

  //   if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
  //     return res.status(401).json({ error: 'O campo de Nome é obrigatório'});
  //   }

  //   if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
  //     return res.status(401).json({ error: 'O email é obrigatório'});
  //   }

  //   if(!req.body.numberphone || typeof req.body.numberphone == undefined || req.body.numberphone == null) {
  //     return res.status(401).json({ error: 'O Número de celular é obrigatório'});
  //   }

  //   if(req.body.numberphone.length > 11 ) {
  //     return res.status(401).json({ error: 'A quantidade de números do telefone não pode ser maior que 11'});
  //   }

  //   if(!req.body.cep || typeof req.body.cep == undefined || req.body.cep == null) {
  //     return res.status(401).json({ error: 'O campo de CEP é obrigatório'});
  //   }

  //   if(!req.body.city || typeof req.body.city == undefined || req.body.city == null) {
  //     return res.status(401).json({ error: 'O campo de Cidade é obrigatório'});
  //   }

  //   if(!req.body.neighborhood || typeof req.body.neighborhood == undefined || req.body.neighborhood == null) {
  //     return res.status(401).json({ error: 'O Bairro é obrigatório'});
  //   }

  //   if(!req.body.street || typeof req.body.street == undefined || req.body.street == null) {
  //     return res.status(401).json({ error: 'A Rua é obrigatória'});
  //   }

  //   if(!req.body.number || typeof req.body.number == undefined || req.body.number == null) {
  //     return res.status(401).json({ error: 'O número é obrigatório'});
  //   }

  //   if(!req.body.complement || typeof req.body.complement == undefined || req.body.complement == null) {
  //     return res.status(401).json({ error: 'O complemento é obrigatório'});
  //   }

  //   if(!req.body.reference || typeof req.body.reference == undefined || req.body.reference == null) {
  //     return res.status(401).json({ error: 'A Referência é obrigatória'});
  //   }


  //   if (oldPassword && !(await user.checkPassword(oldPassword))) {
  //     return res.status(401).json({error: 'Senha antiga errada'});
  //   }

  //   if(oldPassword) {
  //   if(req.body.password !== req.body.confirmPassword) {
  //     return res.status(401).json({error: 'As senhas não batem'});
  //   }
  //   }

  //   if(oldPassword) {
  //   if(req.body.password.length < 6) {
  //     return res.status(401).json({ error: 'O campo senha tem que ter no mínimo 6 caracteres'});
  //   }
  // }

    const { id, name, cep, city, uf, neighborhood, street, number, reference, complement, numberphone  } = await user.update(req.body);

    console.log(req.body);
    return res.json({
      id,
      name,
      email,
      cep,
      city,
      uf, 
      neighborhood, 
      street, 
      number, 
      reference,
      complement,
      numberphone
    });
  }

  async delete(req,res) {
    const { disabled } = true;
    const user = await User.findByPk(req.userId);
    
    if(!user) {
      return res.status(400).json({error: 'User not found'});
    }

    const {id, name} = await user.update({disabled: true});

    return res.json({
      id,
      name,
      disabled
    })
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if(!user) {
        return res.status(400).send({ error: 'User not found' });
      }

      const tokenn = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);
      
      if(user) {
        const {id, name} = await user.update({passwordResetToken: tokenn, passwordResetExpires: now,});
      }

      mailer.sendMail({
        to: email,
        from: 'anderson001749@gmail.com',
        template: 'auth/forgot_password',
        context: { tokenn },
      }, (err) => {
        if (err) {
          return res.status(400).send({ error: 'Cannot send forgot password email'});
        }
        return res.send();
      })


    } catch(err) {
      res.status(400).send({ error: 'Erro on forgot password, try again' });
    }
  }

  async resetPassword(req, res) {
    const { email, token, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      
      if(!user) {
        return res.status(400).send({error: 'User not found'});
      }

      if(token !== user.passwordResetToken) {
        return res.status(400).send({error: 'Token invalid'});
      }

      const now = new Date();

      if(now > user.passwordResetExpires) {
        return res.status(400).send({error: 'Token expired, generate a new one'});
      }

      user.password = password;

      await user.save();

      res.send();
    }catch(err) {
      res.status(400).send({error: 'Cannot reset password, try again later'})
    }
  }

  async createAdmin(req, res) {
    const userExists  = await User.findOne({ where: { email: req.body.email } });

    if(userExists) {
      return res.status(400).json({ error: 'User already exists'});
    }

    const user = await User.findByPk(req.userId);
    
    if(user.admin == false) {
      return res.status(400).json({ error: 'User is not a ADMIN'});
    } else {
    const {id, name, email} = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }
  }
}

export default new UserController();