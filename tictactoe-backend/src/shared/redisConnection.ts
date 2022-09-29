import {createClient} from 'redis';

const client = createClient();

client.on('error', (err: any) => {
  console.log(err);
  });
client.on('connect', function() {
  console.log('Connected!');
});
client.connect();

export default client;