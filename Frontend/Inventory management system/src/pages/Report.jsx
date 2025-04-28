import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import auth from "../connection/auth";
import logo from "/logo-black.png";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [message, setMessage] = useState("No data available for the selected dates.");
    const navigate = useNavigate()

    const fetchReportData = async () => {
      try {
        const response = await auth.generateReport(fromDate, toDate);
        if (response.success === false) {
          setMessage(response.message);
          throw response;
        }
        setReportData(response.history);
        setTotalProfit(response.totalProfit);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
  
  const generatePDF = () => {
    const doc = new jsPDF();
    const formatedFromDate = new Date(fromDate).toLocaleDateString("en-GB");
    const formatedToDate = new Date(toDate).toLocaleDateString("en-GB");

    // Convert imported image to Base64
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      doc.addImage(img, "PNG", 15, 3, 12, 10); // Adjust positioning as needed

      // Adding the application name
      doc.setFontSize(20);
      doc.setFont("sans-serif", "bold");
      doc.text("CompuTrack", 30, 10);

      // Adding the date range on the top right corner with smaller font size
      doc.setFontSize(10);
      doc.text(`Date: ${formatedFromDate} to ${formatedToDate}`, 195, 10, {
        align: "right",
      });

      // Adding the report title
      doc.setFontSize(14);
      doc.text("Report Data", 105, 40, { align: "center" });

      doc.autoTable({
        head: [["Type", "Warehouse", "Product", "Quantity", "Date", "Profit"]],
        body: reportData.map((data) => [
          data.type,
          data.warehouse?.name,
          data.product?.name,
          data.quantity,
          new Date(data.createdAt).toLocaleDateString("en-GB"),
          `$${data.total_profit?.toFixed(2)}`,
        ]),
        styles: { halign: "center" },
        didParseCell: function (data) {
          if (data.row.section === "body") {
            data.cell.styles.fillColor =
              data.row.raw[0] === "incoming"
                ? [204, 255, 204]
                : [255, 204, 204];
          }
        },
      });

      // Adding the total profit at the bottom
      doc.text(
        `Total Profit: $${totalProfit.toFixed(2)}`,
        105,
        doc.autoTable.previous.finalY + 10,
        { align: "center" }
      );
      doc.save("report.pdf");
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // Reset scroll position on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white h-full">
      {/* <h1 className="text-4xl font-bold text-center mb-8">Generate Report</h1> */}

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6 w-full px-4">
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-lg font-bold">From: </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="p-2 rounded text-black w-full md:w-auto"
          />
        </div>
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-lg font-bold">To: </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="p-2 rounded text-black w-full md:w-auto"
          />
        </div>
        <button
          onClick={fetchReportData}
          className="px-6 py-2 md:mt-6 bg-green-500 rounded-lg hover:bg-green-400 w-full md:w-auto"
        >
          Get Report
        </button>
      </div>

      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 max-h-[470px] overflow-y-auto">
        {reportData.length > 0 ? (
          <table className="w-full border border-gray-400 text-center">
            <thead>
              <tr className="border border-gray-400">
                <th className="border border-gray-400">Type</th>
                <th className="border border-gray-400">Warehouse</th>
                <th className="border border-gray-400">Product</th>
                <th className="border border-gray-400">Quantity</th>
                <th className="border border-gray-400">Date</th>
                <th className="border border-gray-400">Profit</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((data, index) => (
                <tr
                  key={index}
                  className={`border border-gray-400 ${
                    data.type === "incoming" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <td className="border border-gray-400">{data.type}</td>
                  <td className="border border-gray-400">
                    {data.warehouse?.name}
                  </td>
                  <td className="border border-gray-400">
                    {data.product?.name}
                  </td>
                  <td className="border border-gray-400">{data.quantity}</td>
                  <td className="border border-gray-400">
                    {new Date(data.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border border-gray-400">
                    ${data.total_profit?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{message}</p>
        )}
        {reportData.length > 0 && (
          <p className="mt-4 text-lg font-bold text-center">
            Total Profit: ${totalProfit.toFixed(2)}
          </p>
        )}
      </div>

      {reportData.length > 0 && (
        <div className="text-center mt-6">
          <Button
            text="Download PDF"
            onClick={generatePDF}
            className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-400"
          />
        </div>
      )}
    </div>
  );
};

export default Report;
