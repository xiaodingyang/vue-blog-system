/*多个域名*/
const origin = location.origin;
let baseUrl = '';
if (origin.includes('baidu')) {
  baseUrl = 'https://www.baidu.com';
} else {
  baseUrl = 'http://10.23.15.161:11083';
}
export default baseUrl;
