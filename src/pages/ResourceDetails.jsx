import { useParams } from "react-router-dom";
import resourceDetails from "../data/resourceDetails";
import "./ResourceDetails.css";

function Row({ label, value }) {
  if (!value) return null;

  const isLink =
    typeof value === "string" &&
    (value.startsWith("http://") || value.startsWith("https://"));

  return (
    <tr>
      <th>{label}</th>
      <td>
        {isLink ? (
          <a href={value} target="_blank" rel="noreferrer">
            Visit Website
          </a>
        ) : (
          value
        )}
      </td>
    </tr>
  );
}

function ResourceDetails() {
  const { slug } = useParams();

  const data = resourceDetails[slug];

  if (!data) {
    return (
      <section className="resource-details-page">
        <div className="resource-details-container">
          <h1>Resource Not Found</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="resource-details-page">
      <div className="resource-details-container">

        <h1>
          {data.formName ||
            data.serviceName ||
            data.websiteName ||
            data.universityName ||
            data.boardName ||
            data.platformName ||
            data.scholarshipName}
        </h1>

        {/* ================= EXAM ================= */}

        {data.type === "exam" && (
          <table className="details-table">
            <tbody>

              <Row label="Form Name" value={data.formName} />
              <Row label="Conducting Body" value={data.conductingBody} />
              <Row label="Official Website" value={data.officialWebsite} />
              <Row label="Official Notification" value={data.officialNotification} />
              <Row label="Registration Start" value={data.registrationStart} />
              <Row label="Last Date" value={data.lastDate} />
              <Row label="Apply Online" value={data.applyOnline} />
              <Row label="Correction Window" value={data.correctionWindow} />
              <Row label="Admit Card" value={data.admitCard} />
              <Row label="Exam Date" value={data.examDate} />
              <Row label="Answer Key" value={data.answerKey} />
              <Row label="Result" value={data.result} />
              <Row label="Counselling" value={data.counselling} />
              <Row label="Eligibility" value={data.eligibility} />
              <Row label="Age Limit" value={data.ageLimit} />
              <Row label="Application Fee" value={data.applicationFee} />
              <Row label="Exam Pattern" value={data.examPattern} />
              <Row label="Syllabus" value={data.syllabus} />
              <Row label="Previous Papers" value={data.previousPapers} />
              <Row label="Latest Update" value={data.latestUpdate} />

            </tbody>
          </table>
        )}

        {/* ================= GOVERNMENT SERVICE ================= */}

        {data.type === "service" && (
          <table className="details-table">
            <tbody>

              <Row label="Service Name" value={data.serviceName} />
              <Row label="Description" value={data.description} />
              <Row label="Official Website" value={data.officialWebsite} />
              <Row label="Apply Online" value={data.applyOnline} />
              <Row label="Required Documents" value={data.requiredDocuments} />
              <Row label="Processing Time" value={data.processingTime} />
              <Row label="Helpline" value={data.helpline} />
              <Row label="Latest Update" value={data.latestUpdate} />

            </tbody>
          </table>
        )}

        {/* ================= OFFICIAL WEBSITE ================= */}

        {data.type === "website" && (
          <table className="details-table">
            <tbody>

              <Row label="Website Name" value={data.websiteName} />
              <Row label="Description" value={data.description} />
              <Row label="Official Website" value={data.officialWebsite} />
              <Row label="Purpose" value={data.purpose} />
              <Row label="Latest Update" value={data.latestUpdate} />

            </tbody>
          </table>
        )}
                {/* ================= UNIVERSITY ================= */}

        {data.type === "university" && (
          <table className="details-table">
            <tbody>

              <Row label="University Name" value={data.universityName} />
              <Row label="Official Website" value={data.officialWebsite} />
              <Row label="Admission Portal" value={data.admissionPortal} />
              <Row label="Result Portal" value={data.resultPortal} />
              <Row label="Exam Portal" value={data.examPortal} />
              <Row label="Academic Calendar" value={data.academicCalendar} />
              <Row label="Contact" value={data.contact} />
              <Row label="Latest Update" value={data.latestUpdate} />

            </tbody>
          </table>
        )}

        {/* ================= BOARD ================= */}

        {data.type === "board" && (
          <table className="details-table">
            <tbody>

              <Row label="Board Name" value={data.boardName} />
              <Row label="Official Website" value={data.officialWebsite} />
              <Row label="Result Link" value={data.resultLink} />
              <Row label="Time Table" value={data.timetable} />
              <Row label="Admit Card" value={data.admitCard} />
              <Row label="Syllabus" value={data.syllabus} />
              <Row label="Sample Papers" value={data.samplePapers} />
              <Row label="Latest Update" value={data.latestUpdate} />

            </tbody>
          </table>
        )}

        {/* ================= PRIVATE JOB ================= */}

        {data.type === "private-job" && (
          <table className="details-table">
            <tbody>

              <Row label="Platform Name" value={data.platformName} />
              <Row label="Description" value={data.description} />
              <Row label="Official Website" value={data.officialWebsite} />
              <Row label="Job Categories" value={data.jobCategories} />
              <Row label="Latest Update" value={data.latestUpdate} />

            </tbody>
          </table>
        )}

        {/* ================= SCHOLARSHIP ================= */}

        {data.type === "scholarship" && (
          <table className="details-table">
            <tbody>

              <Row label="Scholarship Name" value={data.scholarshipName} />
              <Row label="Description" value={data.description} />
              <Row label="Official Website" value={data.officialWebsite} />
              <Row label="Notification" value={data.notification} />
              <Row label="Registration Start" value={data.registrationStart} />
              <Row label="Last Date" value={data.lastDate} />
              <Row label="Apply Online" value={data.applyOnline} />
              <Row label="Eligibility" value={data.eligibility} />
              <Row label="Scholarship Amount" value={data.scholarshipAmount} />
              <Row label="Latest Update" value={data.latestUpdate} />

            </tbody>
          </table>
        )}

      </div>
    </section>
  );
}

export default ResourceDetails;