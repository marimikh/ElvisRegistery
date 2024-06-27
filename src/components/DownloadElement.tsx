import { saveAs } from 'file-saver';
import { Dropdown } from "react-bootstrap";
import * as XLSX from 'xlsx';
import { Variable } from "../data/Types";
import { useEffect, useState } from 'react';

interface DownloadElementProps {
  data: Variable[]; 
}

function DownloadElement({ data }: DownloadElementProps) {

  const [disabled, setDisabled] = useState(false);
  
  useEffect(() => {
    setDisabled(!data || data.length === 0);
  }, [data]); 


  function transformVariableListForExcel(variables: Variable[]): Record<string, any>[] {
    return variables.map((variable) => ({
      ID: variable.id,
      Version: variable.version || "N/A",
      "Information Level": variable.informationLevel?.name || "N/A",
      Category: variable.category?.name || "N/A",
      "Data Type": variable.dataType?.name || "N/A",
      "Registration Method": variable.registrationMethod?.name || "N/A",
      Status: variable.status?.name || "N/A",
      "Technical Name": variable.techName || "N/A",
      Name: variable.name,
      "English Name": variable.nameEn || "N/A",
      Description: variable.description || "N/A",
      "English Description": variable.descriptionEn || "N/A",
      "Valid From": variable.validFrom || "N/A",
      "Created On": variable.createdOn || "N/A",
      "Data Size": variable.dataSize || "N/A",
      "Valid For Extraction": variable.validForExtraction || "N/A",
      "Variable Type": variable.variableType?.name || "N/A",
      "Public Variable": variable.publicVariable ? "Yes" : "No",
    }));
  }
  
  
  const handleDownload = (format: string) => {
    if(data?.length) {
      switch (format) {
        case "xlsx":
          const formatedData = transformVariableListForExcel(data);
          const ws = XLSX.utils.json_to_sheet(formatedData);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Variables');
          const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'Variables' + ".xlsx");
          break;
        case "json":
          const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
          saveAs(jsonBlob, 'Variables' + ".json");
          break;
        default:
          console.error("Inappropriate format");
      }
    }    
  };

  return (
    <Dropdown className='download-dropdown'>
      <Dropdown.Toggle id="download-dropdown" className='download-btn' disabled={disabled}>
        Download
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleDownload("xlsx")}>Excel (xlsx)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDownload("json")}>JSON</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DownloadElement;
