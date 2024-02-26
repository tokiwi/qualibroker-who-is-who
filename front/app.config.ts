export default defineAppConfig({
  ui: {
    primary: 'qualibroker',
    gray: 'cool',
    table: {
      wrapper: 'relative overflow-x-auto',
      base: 'min-w-full table-fixed',
      divide: '',
      thead: 'relative',
      tbody: 'divide-y divide-gray-200 dark:divide-gray-800 rounded-lg overflow-hidden',
      tr: {
        base: '',
        selected: 'bg-gray-50 dark:bg-gray-800/50',
        active: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer',
      },
      th: {
        base: 'text-left rtl:text-right',
        padding: 'px-4 py-3.5',
        color: 'text-[#959595]',
        font: 'font-semibold',
        size: 'text-sm',
      },
      td: {
        base: 'bg-white whitespace-nowrap',
        padding: 'px-4 py-4',
        color: 'text-brand-text',
        font: '',
        size: 'text-sm',
      },
      checkbox: {
        padding: 'ps-4',
      },
      loadingState: {
        wrapper: 'flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14',
        label: 'text-sm text-center text-gray-900 dark:text-white',
        icon: 'w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin',
      },
      emptyState: {
        wrapper: 'flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14',
        label: 'text-sm text-center text-gray-900 dark:text-white',
        icon: 'w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4',
      },
      progress: {
        wrapper: 'absolute inset-x-0 -bottom-[0.5px] p-0',
      },
      default: {
        sortAscIcon: 'i-heroicons-bars-arrow-up-20-solid',
        sortDescIcon: 'i-heroicons-bars-arrow-down-20-solid',
        sortButton: {
          icon: 'i-heroicons-arrows-up-down-20-solid',
          trailing: true,
          square: true,
          color: 'gray',
          variant: 'ghost',
          class: '-m-1.5',
        },
        progress: {
          color: 'primary',
          animation: 'carousel',
        },
        loadingState: {
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        },
        emptyState: {
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'No items.',
        },
      },
    },
    horizontalNavigation: {
      wrapper: 'relative w-full flex items-center justify-between',
      container: 'flex items-center min-w-0',
      inner: 'min-w-0',
      base: 'group relative w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75',
      before: 'before:absolute before:inset-x-0 before:inset-y-2 before:inset-px before:rounded-md hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50',
      after: 'after:absolute after:bottom-0 after:inset-x-2.5 after:block after:h-[2px] after:mt-2',
      active: 'text-gray-900 dark:text-white after:bg-primary-500 dark:after:bg-primary-400 after:rounded-full',
      inactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-900',
      label: 'truncate relative',
      icon: {
        base: 'flex-shrink-0 w-7 h-7',
        active: 'text-qualibroker-600 ',
        inactive: 'text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200',
      },
      avatar: {
        base: 'flex-shrink-0',
        size: '2xs',
      },
      badge: {
        base: 'flex-shrink-0 ml-auto relative rounded',
        color: 'gray',
        variant: 'solid',
        size: 'xs',
      },
    }
  }
})
