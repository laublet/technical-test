import csv from 'csvtojson';

import catchError from '@/services/error';

function launchCSV(req, res, next) {
  const csvFilePath = './WB_MOCK_DATA.csv';

  return csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
      return res.status(200).json({ users: jsonObj });
    })
    .catch(err => {
      next(catchError(err));
    });
}

export default launchCSV;
