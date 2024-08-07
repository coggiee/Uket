import { RadioGroup, RadioGroupItem } from "@uket/ui/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@uket/ui/components/ui/form";
import { ActivityComponentType } from "@stackflow/react";
import { AppScreen, IconBack } from "@stackflow/plugin-basic-ui";


import { validateForm } from "../../../utils/vaildateForm";
import { useStackForm } from "../../../hooks/useStackForm";
import UserTypeItem from "./UserTypeItem";
import NextStepButton from "./NextStepButton";
import {
  Activity,
  ActivityContent,
  ActivityFooter,
  ActivityHeader,
} from "./Activity";

import { Link } from "@/router";

const UserTypeActivity: ActivityComponentType = () => {
  const { form } = useStackForm();

  return (
    <AppScreen
      appBar={{
        border: false,
        height: "56px",
        renderLeft: () => (
          <Link to={"/login"} className="px-1.5">
            <IconBack />
          </Link>
        ),
      }}
    >
      <Activity>
        <ActivityContent>
          <ActivityHeader>
            <h1 className="text-2xl font-black">
              <p>대학생인가요?</p>
              <p>일반인인가요?</p>
            </h1>
          </ActivityHeader>
          <section className="mt-8 grow">
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <div className="flex h-full flex-col justify-between">
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="container flex w-full items-center justify-center"
                      >
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="univ"
                              isCircleVisible={false}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <UserTypeItem
                              title="대학생"
                              desc="소속 학교가 있고 재학 중인 대학생이에요"
                              selected={field.value === "univ"}
                              isUnivUser
                            />
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="no_univ"
                              isCircleVisible={false}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <UserTypeItem
                              title="일반인"
                              desc="소속 학교가 없는 일반인이에요"
                              selected={field.value === "no_univ"}
                            />
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <ActivityFooter>
                    <NextStepButton
                      activityName={"NameActivity" as never}
                      params={{ form }}
                      disabled={
                        !validateForm({
                          type: "type",
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

export default UserTypeActivity;
