import * as moment from 'moment';
import { Op } from 'sequelize';

class QueryUtils {
  public static getDateRangeFilter(
    start_date: string,
    end_date: string,
  ): object {
    if (start_date && end_date) {
      return {
        [Op.between]: [
          moment(start_date).startOf('day').toDate(),
          moment(end_date).endOf('day').toDate(),
        ],
      };
    } else if (start_date) {
      return {
        [Op.gte]: moment(start_date).startOf('day').toDate(),
      };
    } else if (end_date) {
      return {
        [Op.lte]: moment(end_date).endOf('day').toDate(),
      };
    }
  }

  public static iLike(text?: string): object | undefined {
    if (!text) {
      return;
    }

    return {
      [Op.iLike]: `%${text}%`,
    };
  }
}

export default QueryUtils;
