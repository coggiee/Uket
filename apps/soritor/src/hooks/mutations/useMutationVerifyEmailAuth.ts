import { useMutation } from "@tanstack/react-query";

import { verifyEmailAuth } from "@/api/email";

import { EmailAuthVerifyParams } from "@/types/emailType";


export const useMutationVerifyEmailAuth = ({
  email,
  universityId,
  authCode,
}: EmailAuthVerifyParams) => {
  const mutation = useMutation({
    mutationFn: () => verifyEmailAuth({ email, universityId, authCode }),
    onSuccess: () => {},
    onError: () => {},
    throwOnError: false,
  });

  return mutation;
};
