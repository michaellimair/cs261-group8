import { MutationFunction, useMutation } from 'react-query';
import ApiError from 'api/error/ApiError';
import {
  FieldValues, SubmitHandler, UnpackNestedValue, useForm,
} from 'react-hook-form';
import { useCallback } from 'react';
import { merge } from 'lodash';

const useCommonForm = <
TVariables extends FieldValues,
TError extends ApiError<any>,
TData extends any,
>({
    mutationId,
    mutationFn,
  }: {
    mutationFn: MutationFunction<TData, TVariables>;
    mutationId: string;
  }) => {
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm<TVariables>();
  const {
    mutate, isLoading, error: mutationErrors, isSuccess,
  } = useMutation<TData, TError, TVariables>(mutationId, mutationFn);

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
  };
};

export default useCommonForm;
