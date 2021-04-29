import {ILog} from '../../models';
import {LogModel} from '../../database';

class LogService {
  createLog(log: Partial<ILog>): Promise<ILog> {
    const LogToCreate = new LogModel(log);

    return LogToCreate.save();
  }
}

export const logService = new LogService();
