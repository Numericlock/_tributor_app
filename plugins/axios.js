export default function ({ $axios,$cookies }) {
  $axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  $axios.defaults.headers.common['Authorization'] = 'Bearer ' + $cookies.get('_tributor_api_token');

}