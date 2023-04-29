import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline/promises';

import { messages } from './messenger.js';

const getData = async () => {
  const rl = readline.createInterface({ input, output });

  const polynomial = await rl.question(messages.inputPolynomialMsg);
  const startNumber = await rl.question(messages.inputStartNumberMsg);

  const data = { polynomial, startNumber };

  rl.close();

  return data;
};

const getExitCommand = async () => {
  const rl = readline.createInterface({ input, output });

  console.log(messages.emptyLineMsg);
  await rl.question(messages.inputExitCommand);

  rl.close();
};

export { getData, getExitCommand };
