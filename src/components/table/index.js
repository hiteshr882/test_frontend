import React from "react";

export default function Table({ cols, data }) {
  return (
    <div className={"container"}>
      <table>
        <thead>
          <tr>
            {data.slice(0, 1).map((r, i) => (
              <>
                {cols.map((c) => (
                  <th key={c.key}>{r[c.key]}</th>
                ))}
                <th>Status</th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1, data.length).map(
            (r, i) =>
              r.length > 0 && (
                <>
                  <tr key={i}>
                    {cols.map((c) => (
                      <td
                        key={c.key}
                        className={parseInt(r[2]) < 50000 ? "green" : "red"}
                      >
                        {r[c.key]}
                      </td>
                    ))}
                    <td className={parseInt(r[2]) < 50000 ? "green" : "red"}>
                      {parseInt(r[2]) > 50000 ? "Invalid" : "Valid"}
                    </td>
                  </tr>
                </>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
