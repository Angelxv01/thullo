import express from 'express';
import config from './config';
import Logger from './utils/Logger';

const app = express();

app.use(express.static('build'));
app.get('/health', (_req, res) => {
  res.send('ok');
});
app.get('/version', (_req, res) => {
  res.send('0.0.0');
});

const PORT = config.PORT || 3000;

app.listen(PORT, () => Logger.info(`server started on port ${PORT}`));
