'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Com() {
  const [rows, setRows] = useState([
    { time: '08:00', task: 'New Task' },
  ]);

  const addRow = () => {
    setRows([...rows, { time: '08:00', task: 'New Task' }]);
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const updateRow = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    updatedRows.sort((a, b) => a.time.localeCompare(b.time));
    setRows(updatedRows);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Task Table', 14, 20);

    const headers = ['Time', 'Task', 'Action'];
    const body = rows.map(({ time, task }) => [time, task, 'Delete']);

    autoTable(doc, {
      head: [headers],
      body: body,
      startY: 30,
      theme: 'striped',
    });

    doc.save('task-table.pdf');
    window.open(doc.output('bloburl'), '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-10 shadow-xl border border-gray-200">
        <h1 className="text-5xl font-bold text-center text-blue-600 mb-12 tracking-tight">
          Task Scheduler
        </h1>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="p-4 border border-gray-200 text-left uppercase">Time</th>
                <th className="p-4 border border-gray-200 text-left uppercase">Task</th>
                <th className="p-4 border border-gray-200 text-left uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="p-3 border border-gray-200">
                    <input
                      type="time"
                      value={row.time}
                      onChange={(e) => updateRow(index, 'time', e.target.value)}
                      className="bg-white text-gray-900 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    />
                  </td>
                  <td
                    className="p-3 border border-gray-200"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateRow(index, 'task', e.currentTarget.innerText)}
                  >
                    {row.task}
                  </td>
                  <td className="p-3 border border-gray-200">
                    <button
                      onClick={() => deleteRow(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={addRow}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            ➕ Add Task
          </button>
          <button
            onClick={generatePDF}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            📄 Export to PDF
          </button>
        </div>
      </div>
    </div>
  );
}