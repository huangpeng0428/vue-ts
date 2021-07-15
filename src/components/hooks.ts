import {onMounted, ref} from "vue"

export const useQuery = <T>(promise: () => Promise<T>) => {
  const loading = ref(true)
  const data = ref()
  const error = ref<string>()


  const exec = () => {
    promise().then(res => {
      data.value = res;
    })
    .catch(err => {
      error.value= err
    })
    .finally(() => {
      loading.value = false
    })
  }

  onMounted(exec)

  return {
    loading, data, error, refetch: exec
  }
}