import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "../css/invoice.css";

const InvoiceGeneratorPage = () => {
  const generatePDF = () => {
    const input = document.getElementById("invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };

  return (
    <>
      <div
        id="invoice"
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="p-6">
          <div className="mb-6 h-32 flex justify-between">
            <div className="  items-center flex gap-x-2 p-6 rounded-lg">
              <img
                className="w-20"
                src="https://cdn.pixabay.com/photo/2014/12/22/00/00/wheat-576549_1280.png"
                alt=""
              />
              <h1 className="text-slate-700 font-bold text-3xl">
                Shaadaab Angro
              </h1>
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold">Invoice</h1>
              <p className="text-gray-600">Ref # 1234</p>
              <p className="text-gray-600">Invoice date: Jan 20, 2024</p>
            </div>
          </div>
          <hr className="bg-slate-800 h-[1px]" />
          <div className="flex justify-between my-6">
            <div>
              <h1 className="text-2xl font-bold">Invoice To</h1>
              <p>Asad Javed</p>
              <p className="text-gray-600">Contact: 000111222333</p>
              <p className="text-gray-600">Address: Miawali</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Invoice From</h1>
              <p>Imtiaz Ali</p>
              <p className="text-gray-600">Contact: 000111222333</p>
              <p className="text-gray-600">Email: test@email.com</p>
            </div>
          </div>

          <div className="invoice-details my-20">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-medium text-slate-800 uppercase tracking-wider bg-lime-500">
                    Item
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-slate-800 uppercase tracking-wider bg-lime-500">
                    Description
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-txt-white uppercase tracking-wider bg-slate-800">
                    Quantity
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-txt-white uppercase tracking-wider bg-slate-800">
                    Unit Price
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-txt-white uppercase tracking-wider bg-slate-800">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 px-4 whitespace-nowrap">Item 1</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    Sample item description
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">2</td>
                  <td className="py-2 px-4 whitespace-nowrap">$50.00</td>
                  <td className="py-2 px-4 whitespace-nowrap">$100.00</td>
                </tr>
                <tr className="bg-slate-200">
                  <td className="py-2 px-4 whitespace-nowrap">Item 2</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    Sample item description
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">3</td>
                  <td className="py-2 px-4 whitespace-nowrap">$30.00</td>
                  <td className="py-2 px-4 whitespace-nowrap">$90.00</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 whitespace-nowrap">Item 3</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    Sample item description
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">1</td>
                  <td className="py-2 px-4 whitespace-nowrap">$70.00</td>
                  <td className="py-2 px-4 whitespace-nowrap">$70.00</td>
                </tr>
                <tr className="bg-gray-100">
                  <td
                    colSpan="4"
                    className="py-2 px-4 text-right text-sm font-medium text-gray-500 uppercase"
                  >
                    Subtotal
                  </td>
                  <td className="py-2 px-4 text-right">$260.00</td>
                </tr>
                <tr className="bg-gray-100">
                  <td
                    colSpan="4"
                    className="py-2 px-4 text-right text-sm font-medium text-gray-500 uppercase"
                  >
                    Tax (10%)
                  </td>
                  <td className="py-2 px-4 text-right">$26.00</td>
                </tr>
                <tr className="bg-gray-100">
                  <td
                    colSpan="4"
                    className="py-2 px-4 text-right text-sm font-medium text-gray-500 uppercase"
                  >
                    Discount (10%)
                  </td>
                  <td className="py-2 px-4 text-right">$26.00</td>
                </tr>
                <tr className="bg-gray-100">
                  <td
                    colSpan="4"
                    className="py-2 px-4 text-right text-lg font-bold text-gray-700 uppercase"
                  >
                    Total
                  </td>
                  <td className="py-2 px-4 text-right text-lg font-bold bg-lime-500">
                    $286.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ml-auto w-52 mr-10">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOheWnmVYHLvqHBFZzYf5ZtU5MZWu8B6MypQ&s"
              alt=""
            />
            <hr className="h-[1px] bg-slate-800" />
            <p className="text-center pt-2 ">Signed: Imtiaz Ali</p>
          </div>
          <p className="text-lg font-semibold">Terms and conditions</p>
          <p className="text-sm text-slate-600 mt-2 w-1/2 my-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
            eligendi temporibus et tempora adipisci vitae cumque nostrum neque.
            Asperiores, quis!
          </p>
          <div className="invoice-footer text-center bg-slate-800 text-txt-white p-4 rounded-b-lg">
            <p className="text-base mt-4">Thank you for your business!</p>
            <p className="text-base">
              Address: Loremetur, adipisicing elit. Quidem, nam.
            </p>
            <p className="text-base">Contact: 0979798347</p>
          </div>
        </div>
      </div>
      <div className="text-center py-6">
        <button
          onClick={generatePDF}
          className="bg-lime-500 hover:bg-lime-600 text-txt-white font-bold py-2 px-6 rounded-lg focus:outline-none"
        >
          Download Invoice
        </button>
      </div>
    </>
  );
};

export default InvoiceGeneratorPage;
