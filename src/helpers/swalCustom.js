export function provideSwal () {
  return import('sweetalert2').then(({ default: Swal }) => Swal.mixin({
    customClass: {
      popup: 'bg-gray-100 dark:bg-slate-800',
      title: 'dark:text-white',
      htmlContainer: 'dark:text-gray-50'
    }
  }))
}
