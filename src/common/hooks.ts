import {onMounted, ref, Ref} from "vue"

interface useQueryProps {
  loading: {
    value: boolean
  }
  data: any
  error: {
    value: string | undefined
  }
  refetch: () => any
}

export const useQuery = <T>(promise: () => Promise<T>): useQueryProps => {
  const loading = ref(true)
  const data = ref<T>()
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



export const useMutation: <V extends unknown[], T>(
  promise: (...restParams: V) => Promise<T>,
  options?: {
    onComplated?: (data: T) => void;
    onError?: (err: string) => void;
    onFinally?: () => void;
  }
) => [
  (...params: V) => void,
  {
    loading: Ref<boolean>;
    error: Ref<string | undefined>;
  }
] = <V extends unknown[], T>(
  promise: (...restParams: V) => Promise<T>,
  options?: {
    onComplated?: (data: T) => void;
    onError?: (err: string) => void;
    onFinally?: () => void;
  }
) => {
  const loading = ref(false);
  const error = ref<string>();

  const trigger = (...restParams: V) => {
    loading.value = true;
    promise(...restParams)
      .then(res => {
        options?.onComplated?.(res);
      })
      .catch(err => {
        error.value = err;
        options?.onError?.(err);
      })
      .finally(() => {
        loading.value = false;
        options?.onFinally?.();
      });
  };

  return [trigger, { loading, error }];
};