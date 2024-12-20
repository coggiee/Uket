import { Button } from "@uket/ui/components/ui/button";


import { useNavigate } from "@/router";

import { FormType, useTicketStackForm } from "@/hooks/useTicketStackForm";

import { useTicketFlow } from "@/utils/useTicketFlow";


interface NextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  activityName: never;
  disabled: boolean;
  routeUrl?: string;
  params?: {
    form: FormType;
  } & Record<string, unknown>;
}

const NextButton = (as: NextButtonProps) => {
  const { activityName, disabled, params, routeUrl, ...props } = as;
  const { push, pop } = useTicketFlow();
  const { onSubmit } = useTicketStackForm();

  const navigate = useNavigate();

  const form = params?.form;

  const handleClick = async () => {
    if (activityName === "MainActivity") {
      pop();
      pop();
      pop();
      navigate(routeUrl as any, { replace: true });
      return;
    } else if (activityName === "CompleteActivity" && form) {
      try {
        await onSubmit(form.getValues());
      } finally {
        pop();
        pop();
      }
    }

    push(activityName, params || {});
  };

  return (
    <Button
      className="bg-brand hover:bg-brandHover disabled:bg-formInput h-16 w-full rounded-none text-base font-extrabold disabled:text-black disabled:opacity-100"
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      다음으로
    </Button>
  );
};

export default NextButton;
