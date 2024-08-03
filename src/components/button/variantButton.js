const PrintCards = ({ cards }) => {
  const handlePrint = () => {
    const formattedCards = cards.map((card) => ({
      content: card.content.toUpperCase(),
      title: card.title,
    }));

    const hideFrame = document.createElement("iframe");
    hideFrame.onload = function () {
      const doc = hideFrame.contentWindow.document.open();
      doc.write("<html><head><title>Team Building Cards</title>");
      doc.write("<style>");
      doc.write(`
        .cards-to-print {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, sans-serif;
        font-size: 12px;
      }
      .card {
          margin: 10px;
          padding: 16px;
          width: 320px;
          page-break-inside: avoid;
      }
      `);
      doc.write("</style>");
      doc.write("</head><body>");
      doc.write('<div class="cards-to-print">');
      formattedCards.forEach((card, index) => {
        doc.write('<div class="card">');
        doc.write(`<p>Categoría: ${card.title} || <span> Tarjeta: #${index + 1}</span></p>`);
        doc.write(`<p>${card.content}</p>`);
        doc.write("</div>");
      });
      doc.write("</div>");
      doc.write("</body></html>");
      doc.close();

      const closePrint = () => {
        document.body.removeChild(hideFrame);
      };
      hideFrame.contentWindow.onbeforeunload = closePrint;
      hideFrame.contentWindow.onafterprint = closePrint;
      hideFrame.contentWindow.print();
    };
    hideFrame.style.display = "none";
    document.body.appendChild(hideFrame);
  };

  return (
    <div>
      <button onClick={handlePrint} className="cursor-pointer w-full font-bold md:w-1/2 p-2 mx-auto rounded-lg border-b border-sky-800 bg-gradient-to-r from-sky-900 to-sky-500 hover:bg-gradient-to-l text-center text-gray-100 py-4 text-sm md:text-base">
      Imprimir Tarjetas
      </button>
    </div>
  );
};

export default PrintCards;
