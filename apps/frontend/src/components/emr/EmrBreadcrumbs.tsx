import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "wouter";
import { useMaybeRecord } from "./RecordEdit";
import { useMaybeVisit } from "./EmrVisit";
import { useMaybeDiagnosis } from "./RecordDiagnosis";

export function EmrBreadcrumbs() {
  const record = useMaybeRecord();
  const visit = useMaybeVisit();
  const diagnosis = useMaybeDiagnosis();

  return (
    <Breadcrumb className="mb-2">
      <BreadcrumbList>
        <BreadcrumbLink asChild>
          <Link to="~/emr">Visits</Link>
        </BreadcrumbLink>
        <BreadcrumbSeparator />
        {visit && (
          <>
            <BreadcrumbLink asChild>
              <Link to={`~/emr/visit/${visit.id}`}>
                {visit.patient.firstName} {visit.patient.lastName}
              </Link>
            </BreadcrumbLink>
          </>
        )}
        {record && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <Link to="/">Record {record.creationTime.toLocaleString()}</Link>
            </BreadcrumbLink>
          </>
        )}
        {diagnosis && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbLink>
              <Link
                to={`~/emr/visit/${visit?.id}/record/${record?.id}/diagnosis/${diagnosis?.id}`}
              >
                Diagnosis {diagnosis.creationTime.toLocaleString()}
              </Link>
            </BreadcrumbLink>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
