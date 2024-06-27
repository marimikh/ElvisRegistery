import { Variable } from "../data/Types";
import { useEffect, useState } from 'react';
import ElvisDataService from "../services/ElvisDataService";

interface VariableDetailsProps {
  variable: Variable;
}

function EntryDetailsCard({ variable }: VariableDetailsProps) {
  const [variableDetails, setVariableDetails] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVariableDetails() {
      try {
        const data = await ElvisDataService.getVariableDetails(variable.id);
        setVariableDetails(data);
      } catch (error) {
        setError("An error occurred while fetching details.");
        console.error(error); 
      } finally {
        setIsLoading(false);
      }
    }

    fetchVariableDetails();
  }, [variable.id]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
   <div className="row py-3 px-4">
    <div className="col-md-6">
      {variable.validFrom && <p><b>Valid From:</b> {variable.validFrom}</p>}
      {variable?.createdOn && <p><b>Created on:</b> {variable.createdOn}</p>}
      {variable.status && <p><b>Status:</b> {variable.status.name}</p>}
      {variableDetails?.approvedOn && <p><b>Approved On:</b> {variableDetails?.approvedOn}</p>}
      {variableDetails?.approvedBy && <p><b>Approved By:</b> {variableDetails?.approvedBy}</p>}
      {variable.variableType && <p><b>Variable Type:</b> {variable.variableType.name} ({variable.variableType.nameEn})</p>}
    </div>
    <div className="col-md-6">
      {variableDetails?.descriptionOfQuality && <p><b>Description Of Quality:</b> {variableDetails?.descriptionOfQuality}</p>}
      {variable?.informationLevel && <p><b>Information Level:</b> {variable.informationLevel.name} ({variable.informationLevel.nameEn})</p>}
      {variable?.registrationMethod && <p><b>Registration Methods:</b> {variable.registrationMethod.name} ({variable.registrationMethod.nameEn})</p>}
      {variable?.dataType && <p><b>Datatype:</b> {variable.registrationMethod.name} ({variable.registrationMethod.nameEn})</p>}
    </div>
</div>
  );
}

export default EntryDetailsCard;
