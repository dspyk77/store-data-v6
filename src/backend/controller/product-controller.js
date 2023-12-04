import ProductRepository from '@/backend/repository/product-repository';
import ProductMapper from '@/backend/mapper/product-mapper';

export default class ProductController {

  static async index(req, res) {
    console.log('[ProductController#index]');

    const products = await ProductRepository.findAll();

    const response = ProductMapper.toObjectCollection(products);
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async show(req, res) {
    const { id } = req.query;
    console.log(`[ProductController#show] ${id}`);

    const product = await ProductRepository.findById(id);

    const response = ProductMapper.toObject(product);
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async create(req, res) {
    const data = req.body;
    console.log(`[ProductController#create] ${JSON.stringify(data)}`);

    const product = ProductMapper.fromObject(data);

    await ProductRepository.create(product);

    const response = { msg: 'Created successfully' };
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async update(req, res) {
    const { id } = req.query;
    const data = req.body;
    console.log(`[ProductController#update] ${id}, ${JSON.stringify(data)}`);

    const product = ProductMapper.fromObject(data);
    product.setId(id);

    await ProductRepository.update(product);

    const response = { msg: 'Updated successfully' };
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async destroy(req, res) {
    const { id } = req.query;
    console.log(`[ProductController#destroy] ${id}`);

    await ProductRepository.destroy(id);

    const response = { msg: 'Deleted successfully' };
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }
}
