import mongoose from 'mongoose';

const ProductBase = mongoose.model(
  'Product',
  mongoose.Schema({
    project_code: { type: String, required: true },
    category: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    days_frequency: { type: Number, default: 0 },
    images: [String],
    data: {}
  })
);

export default class Product extends ProductBase {
  static find_by_id(_id) {
    const product = Product.findById(_id);

    if (!product) throw new NotFoundError(`project not found, id: ${_id}`);

    return product;
  }

  static find_by_code(project_code, code) {
    return Product.find({ project_code, code });
  }
}
