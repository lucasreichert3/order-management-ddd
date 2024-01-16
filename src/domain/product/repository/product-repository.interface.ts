import Product from '../entity/product';
import RepositoryInterface from '../../@shared/repository/repository-interface';

export default interface ProdutRepositoryInterface
  extends RepositoryInterface<Product> {}
