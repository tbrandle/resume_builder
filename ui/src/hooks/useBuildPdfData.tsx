import { omit } from "lodash";
import { useMemo } from "react";
import { Resume } from "../types/resumeTypes";

const useBuildPdfData = (formData: Resume) => {
  const personlDetails = useMemo(
    () => omit(formData.personal_details, ["fields"]),
    [formData.personal_details],
  );
  const socialMedia = useMemo(
    () => omit(formData.social_media, ["fields"]),
    [formData.social_media],
  );
  const skills = useMemo(() => {
    return formData.skills.map((skill) => omit(skill, ["fields"]));
  }, [formData.skills]);
  const employmentHistory = useMemo(
    () =>
      formData.employment_history.map((history) => omit(history, ["fields"])),
    [formData.employment_history],
  );
  const education = useMemo(
    () => formData.education.map((education) => omit(education, ["fields"])),
    [formData.education],
  );

  return {
    personlDetails,
    socialMedia,
    skills,
    employmentHistory,
    education,
  };
};

export default useBuildPdfData;
