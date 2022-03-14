import { MutationFunction, MutationKey, useMutation } from 'react-query';
import ApiError from 'api/error/ApiError';
import {
  DeepPartial,
  FieldValues,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
} from 'react-hook-form';
import { useCallback } from 'react';
import { merge } from 'lodash';

const useCommonForm = <
TVariables extends FieldValues,
TError extends ApiError<any> = ApiError<any>,
TData = any,
>({
    mutationId,
    mutationFn,
    onSuccess,
    defaultValues,
  }: {
    mutationFn: MutationFunction<TData, TVariables>;
    mutationId: MutationKey;
    defaultValues?: UnpackNestedValue<DeepPartial<TVariables>>;
    onSuccess?: (data: TData, variables: TVariables, context: unknown) => void | Promise<unknown>
  }) => {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    watch,
    control,
  } = useForm<TVariables>({
    defaultValues,
  });
  const {
    mutate, isLoading, error: mutationErrors, isSuccess,
  } = useMutation<TData, TError, TVariables>(mutationId, mutationFn, { onSuccess });

  const { errors: formErrors } = formState;

  const errors = merge({}, formErrors, mutationErrors?.data);

  const onSubmit: SubmitHandler<TVariables> = useCallback(
    (values: UnpackNestedValue<TVariables>) => {
      mutate(values as TVariables);
    },
    [mutate],
  );

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    isSuccess,
    reset,
    setValue,
    control,
    watch,
  };
};

export default useCommonForm;
