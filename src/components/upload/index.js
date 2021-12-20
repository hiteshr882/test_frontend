import React, { useState } from "react";
import { axios } from "../../config/axios";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import Table from "../table";

export default function Upload() {
  const [data, setData] = useState([]);
  const [cols, setCols] = useState([]);
  const [show, setShow] = useState(true);
  const [name, setName] = useState("Upload");

  const changeHandler = (evt) => {
    const target = evt.target;

    if (!!target.files[0].name.match(/(.xls|.xlsx)/)) {
      setName(target.files[0].name);
      const reader = new FileReader();

      reader.onload = (e) => {
        const bStr = e.target.result;
        const wb = XLSX.read(bStr, {
          type: "binary",
          cellDates: true,
        });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];

        let result = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setData(result);
        setCols(make_cols(ws["!ref"]));
      };
      reader.readAsBinaryString(target.files[0]);
    } else {
      toast("Invalid File");
    }
  };

  const make_cols = (refStr) => {
    let o = [],
      C = XLSX.utils.decode_range(refStr).e.c + 1;
    for (let i = 0; i < C; ++i)
      o[i] = { name: XLSX.utils.encode_col(i), key: i };
    return o;
  };

  const changeStatus = () => {
    setShow(!show);
  };

  const handleSubmit = () => {
    axios.post("/upload", data).then((res) => {
      toast("Data Saved Successfully");
    });
  };

  return (
    <div>
      {show ? (
        <div className="upload">
          <div className="file file--upload ">
            <label htmlFor="input-file">{name}</label>
            <input
              id="input-file"
              type="file"
              name="file"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <button
            onClick={() => changeStatus("Submitted")}
            className="upload-btn"
          >
            {" "}
            Next{" "}
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <Table cols={cols} data={data} />
          <div>
            <button onClick={handleSubmit} className="upload-btn">
              {" "}
              Submit{" "}
            </button>
            <button
              onClick={() => {
                setName("Upload");
                changeStatus("Cancelled");
              }}
              className="upload-btn"
            >
              {" "}
              Cancel{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
