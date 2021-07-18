import { FetchService } from './modules/fetch/fetch.service';

async function test() {
  const a = new FetchService();
  const res = await a.fetchPagesFromWeb('https://crawler-test.com');
  console.log(res);
}

(async () => await test())();
