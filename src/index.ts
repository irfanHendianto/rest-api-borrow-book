import config from './constants/config';
import app from './server'; 

app.listen(config.APP_PORT, () => {
  console.log(config);
  console.log(`server listening at http://localhost:${config.APP_PORT}`);
}).on('error', (e) => {
  console.error('Error happened: ', e.message)
  process.exit(1);
});

