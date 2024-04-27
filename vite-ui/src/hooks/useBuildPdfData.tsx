import { omit } from "lodash";
import { useMemo } from "react";
import { Resume } from "../types/resumeTypes";

const useBuildPdfData = (resume: Resume) => {
  const personlDetails = useMemo(() => {
    return resume.personal_details.fields
      ? omit(resume.personal_details, ["fields"])
      : resume.personal_details;
  }, [resume.personal_details]);

  const socialMedia = useMemo(() => {
    return resume.social_media.fields
      ? omit(resume.social_media, ["fields"])
      : resume.social_media;
  }, [resume.social_media]);

  const skills = useMemo(() => {
    return resume.skills.length
      ? resume.skills.map((skill) => omit(skill, ["fields"]))
      : resume.skills;
  }, [resume.skills]);

  const employmentHistory = useMemo(
    () =>
      resume.employment_history.length
        ? resume.employment_history.map((history) => omit(history, ["fields"]))
        : resume.employment_history,
    [resume.employment_history],
  );

  const education = useMemo(
    () =>
      resume.education.length
        ? resume.education.map((education) => omit(education, ["fields"]))
        : resume.education,
    [resume.education],
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
