import express from 'express';
import {connect} from 'mongoose';

import config from './utils/config';
import Logger from './utils/Logger';

const app = express();

connect(config.MONGODB || '')
  .then(() => Logger.info('connected to MongoDB'))
  .catch(err => Logger.error(err));

// general endpoints
app.use(express.static('build'));
app.get('/health', (_req, res) => {
  res.send('ok');
});
app.get('/version', (_req, res) => {
  res.send('0.0.0');
});

const PORT = config.PORT || 3000;

app.listen(PORT, () => Logger.info(`server started on port ${PORT}`));
