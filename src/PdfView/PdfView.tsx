import { ProfileDetails } from "../types/resumeTypes";
import DOMPurify from "isomorphic-dompurify";

// Create Document Component
const PdfView = ({ personalDetails }: { personalDetails: ProfileDetails }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(personalDetails.professional_summary),
      }}
    ></div>
  );
};

export default PdfView;
