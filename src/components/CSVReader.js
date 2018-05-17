import React from 'react';
import { string, func, element, oneOfType } from 'prop-types';
import { Button } from 'semantic-ui-react';
const PapaParse = require('papaparse/papaparse.min.js');

const CSVReader = ({ cssClass = 'upload-btn-wrapper', onFileLoaded, onError }) => {
  let fileContent = undefined;

  const handleChangeFile = e => {
    let reader = new FileReader();
    const filename = e.target.files[0].name;

    reader.onload = event => {
      const csvData = PapaParse.parse(event.target.result, {
        error: onError,
        dynamicTyping: true,
      });
      onFileLoaded(csvData.data, filename);
    };

    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className={cssClass}>
      <Button primary>Upload a file</Button>
      <input type="file" accept="text/csv" onChange={e => handleChangeFile(e)} />
    </div>
  );
};

CSVReader.propTypes = {
  cssClass: string,
  onFileLoaded: func,
  onError: func
};

export default CSVReader;