import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ProfileDetails } from "../types/resumeTypes";
import DOMPurify from "isomorphic-dompurify";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const PdfView = ({ personalDetails }: { personalDetails: ProfileDetails }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {Object.keys(personalDetails).map((key) => {
            return <Text>{personalDetails[key as keyof ProfileDetails]}</Text>;
          })}
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(personalDetails.professional_summary),
            }}
          ></div>
        </View>
        <View style={styles.section}></View>
      </Page>
    </Document>
  );
};

export default PdfView;
