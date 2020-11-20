import IFindBySlug from '@modules/plans/dtos/IFindBySlug';
import Plan from '@modules/plans/infra/memory/entities/Plan';

export default interface IPlansRepository {
  getAll(): Promise<Plan[]>;
  findBySlug(data: IFindBySlug): Promise<Plan | undefined>;
}
