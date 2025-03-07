import { Input } from "@uket/ui/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@uket/ui/components/ui/form";
import { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";

import { useStackForm } from "@/hooks/useStackForm";

import { validateForm } from "../../../utils/vaildateForm";
import NextStepButton from "./NextStepButton";
import {
  Activity,
  ActivityContent,
  ActivityFooter,
  ActivityHeader,
  ActivityParams,
} from "./Activity";

interface NameParmas extends ActivityParams {}

const NameActivity: ActivityComponentType<NameParmas> = () => {
  const { form } = useStackForm();

  return (
    <AppScreen appBar={{ border: false, height: "56px" }}>
      <Activity>
        <ActivityContent>
          <ActivityHeader>
            <h1 className="text-2xl font-black">
              <p>입금자명 확인을 위해</p>
              <p>성함을 입력해 주세요.</p>
            </h1>
            <h2 className="text-desc">예금주명과 동일하게 작성해 주세요.</h2>
          </ActivityHeader>
          <section className="grow">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <div className="flex h-full flex-col justify-between">
                  <FormItem className="container">
                    <FormControl>
                      <Input
                        placeholder="예금주명"
                        className="border-formInput border placeholder:font-light placeholder:text-[#8989A1]"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <ActivityFooter>
                    <NextStepButton
                      activityName={"PhoneActivity" as never}
                      params={{ form }}
                      disabled={
                        !validateForm({
                          type: "name",
                          value: field.value,
                        })
                      }
                    />
                  </ActivityFooter>
                </div>
              )}
            />
          </section>
        </ActivityContent>
      </Activity>
    </AppScreen>
  );
};

export default NameActivity;
