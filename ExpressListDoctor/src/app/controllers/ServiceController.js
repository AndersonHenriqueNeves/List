import Service from '../models/Service';

class ServiceController {
  async store(req, res) {
    try {
  
    const { name, price} = req.body;

    const service = await Service.create({
      professional_id: req.professionalId,
      name,
      price,
    })

    return res.json(service);
  } catch(err) {
    console.log(err);
  }
  }
}

export default new ServiceController();