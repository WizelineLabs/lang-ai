import { useContext, useEffect } from "react";
import AlertContext from "~/contexts/AlertContext";
import { isRequestSuccess } from "~/server/models";
import { ChevronIcon, LinkButton, Section } from "~/components";

import { api } from "~/utils/api";

export interface EnglishLevelSectionProps {
  showButton: boolean;
}

export function EnglishLevelSection(props: EnglishLevelSectionProps) {
  const { showAlert } = useContext(AlertContext);

  const { data, isLoading, error } =
    api.evaluations.getCurrentEnglishLevel.useQuery();

  const value = data && isRequestSuccess(data) ? data.value : undefined;

  useEffect(() => {
    if (data) {
      if (isRequestSuccess(data)) {
      } else {
        showAlert(data.error.message);
        console.error(data.error.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Section>
      <div className="flex flex-row">
        <div className="flex grow flex-col justify-center space-y-3 px-8 py-12 align-middle">
          <h5 className="text-center text-2xl font-bold text-primary">
            Current English Level:{" "}
            <span
              className={
                value?.isEnoughForWizeline
                  ? "text-emerald-600"
                  : "text-secondary"
              }
            >
              {value?.cefrString ?? "-"}
            </span>
          </h5>
          <span className="text-center text-sm text-secondary">
            You need a level of C1 to be admitted to Wizeline.
          </span>
        </div>
        {props.showButton && (
          <LinkButton
            className="my-auto mr-9"
            icon={<ChevronIcon />}
            iconInRight
            href="/evaluations/"
          >
            Go to Evaluations
          </LinkButton>
        )}
      </div>
    </Section>
  );
}
