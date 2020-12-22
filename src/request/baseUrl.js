/*多个域名*/
const origin = location.origin;
let baseUrl = '';
if (origin.includes('baidu')) {
  baseUrl = 'https://www.baidu.com';
} else {
  baseUrl = 'http://localhost:8001/api';
}
export default baseUrl;
