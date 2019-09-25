import { spawn } from 'child_process';

import catchError from '@/services/error';

function runScript() {
  return new Promise((resolve, reject) => {
    const pythonScript = './scriptPython.py';
    const pyProcess = spawn('python', [pythonScript]);

    const out = [];
    pyProcess.stdout.on('data', data => {
      out.push(data);
    });

    const err = [];
    pyProcess.stderr.on('data', data => {
      err.push(data);
    });

    pyProcess.on('exit', code => {
      const parsedBody = Buffer.concat(out).toString();

      if (code !== 0) {
        reject(new Error(err.join('\n')));
        return;
      }
      try {
        resolve(parsedBody);
      } catch (e) {
        reject(e);
      }
    });
  });
}

function launchScript(req, res, next) {
  console.log('test');
  runScript()
    .then(output => {
      return res.status(200).json(output);
    })
    .catch(err => {
      next(catchError(err));
    });
}

export default launchScript;
