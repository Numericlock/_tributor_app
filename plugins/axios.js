export default function ({ $axios }) {
  $axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  //$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$cookies.get('laravel_session');

}