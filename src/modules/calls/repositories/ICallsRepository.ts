import Call from '@modules/calls/infra/memory/entities/Call';
import IFindCallDTO from '@modules/calls/dtos/IFindCallDTO';

export default interface ICallsRepository {
  getAll(): Promise<Call[]>;
  findByOriginAndDestination(data: IFindCallDTO): Promise<Call | undefined>;
}
