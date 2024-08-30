import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { MW_URL } from '@/shared/core/envs';
import { genericResponseSchema } from '@/shared/core/schemas';
import { mwPOST } from '@/shared/utils/mw-post';

const waitlistPayloadSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  company: z.string().min(1, { message: 'Company is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
});
type WaitlistPayload = z.infer<typeof waitlistPayloadSchema>;

const addToWaitlist = async (payload: WaitlistPayload) => {
  const { success, message } = await mwPOST({
    url: `${MW_URL}/grants/mail`,
    label: 'addToWaitlist',
    payload,
    payloadSchema: waitlistPayloadSchema,
    responseSchema: genericResponseSchema,
  });

  if (!success) {
    throw new Error(message);
  }

  return { message };
};

export const useAddToWaitlist = () =>
  useMutation({
    mutationFn: (payload: WaitlistPayload) => addToWaitlist(payload),
    onSuccess: () => toast.success('You have been added to the waitlist!'),
    onError: (error) => toast.error(error.message),
  });
