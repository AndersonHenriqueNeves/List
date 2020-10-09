import Payment from '../models/Payment';
import Profissional from '../models/Profissionais';

class PaymentController {
  async store(req, res) {
    try {
    
    
    const { type } = req.body;

    const professional = await Profissional.findByPk(req.professionalId);

    if(!professional) {
      return res.status(400).json({ error: 'Professional não encontrado'});
    }

    const [ payment ] = await Payment.findOrCreate({
      where: { type }
    });

    await professional.addPayment(payment);

    return res.json(payment);
  } catch(err) {
    console.log(err);
  }
  }
}

export default new PaymentController();