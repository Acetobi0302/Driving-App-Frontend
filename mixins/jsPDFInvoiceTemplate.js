/* eslint-disable new-cap */

// eslint-disable-next-line import/no-named-as-default
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const OutputType = {
  Save: 'save', // save pdf as a file
  DataUriString: 'datauristring', // returns the data uri string
  DataUri: 'datauri', // opens the data uri in current window
  DataUrlNewWindow: 'dataurlnewwindow', // opens the data uri in new window
  Blob: 'blob', // return blob format of the doc,
  ArrayBuffer: 'arraybuffer', // return ArrayBuffer format
}

export { OutputType, jsPDF }

export const jsd = {
  methods: {
    jsPDFInvoiceTemplate(props) {
      const param = {
        body: props.body,
        columns: props.columns,
        fileName: props.fileName || 'file',
        orientationLandscape: props.orientationLandscape || false,
        business: {
          address:
            props.business?.address ||
            'Filiale 1 - Schwedenstraße 18 , 13357 Berlin',
          phone:
            props.business?.phone ||
            'Filiale 2 - Scharnweberstraße 60, 13405 Berlin',
          email:
            props.business?.email ||
            'Filiale 3 - Scharnweberstraße 25, 13405 Berlin',
          website: props.business?.website || ' ',
        },
        contact: {
          label: props.contact?.label || '',
        },
        invoice: {
          label: props.invoice?.label || '',
          invDate: props.invoice?.invDate || '',
          invTotal: props.invoice?.invTotal || '',
          invDescLabel: props.invoice?.invDescLabel || 'Bürozeiten',
          invDesc:
            props.invoice?.invDesc ||
            'Montag - Freitag: 09.00 - 19.00 Uhr + Samstags: 10.00 - 15.00 Uhr Absage von Fahrstunden NUR persönlich oder telefonisch! Eingeplante Fahrstunden, die NICHT eingehalten werden können, müssen 2 WERKTAGE (Samstage zählen hierbei NICHT zu den Werktagen) vorher abgesagt werden.',
          row1: props.invoice?.row1 || '',
          row2: props.invoice?.row2 || '',
        },
        pageEnable: props.pageEnable || true,
        pageLabel: props.pageLabel || 'Page',
      }

      const options = {
        orientation: param.orientationLandscape ? 'landscape' : '',
      }

      // eslint-disable-next-line no-var
      var doc = new jsPDF(options)

      const imageHeader = new Image()
      imageHeader.src = 'logo.png'

      const docWidth = doc.internal.pageSize.width

      const colorBlack = '#000000'
      const colorGray = '#4d4e53'
      // var startPointRectPanel1 = currentHeight + 6;
      // header
      const pdfConfig = {
        headerTextSize: 20,
        labelTextSize: 12,
        fieldTextSize: 10,
        lineHeight: 6,
        subLineHeight: 4,
      }

      // end contact part
      const totalPagesExp = '{total_pages_count_string}'
      // Or use javascript directly:
      let count = 0
      const datad = param.body.map((obj) => ({ ...obj, count: ++count }))
      doc.autoTable({
        margin: { top: 55 }, // European countries centered
        body: datad,
        headStyles: { fillColor: [41, 128, 186] },
        columns: param.columns,
        theme: 'grid',
        didDrawPage(data) {
          // Header
          let currentHeight = 15
          doc.addImage(imageHeader, 16, 9, 50, 18)
          if (param.business.name) {
            doc.setFontSize(pdfConfig.headerTextSize)
            doc.setTextColor(colorBlack)
            doc.text(docWidth - 10, currentHeight, param.business.name, 'right')
            currentHeight += pdfConfig.subLineHeight
            currentHeight += pdfConfig.subLineHeight
          }
          doc.setFontSize(pdfConfig.fieldTextSize - 1)
          doc.setTextColor(colorGray)
          doc.text(
            docWidth - 10,
            currentHeight,
            param.business.address,
            'right'
          )
          currentHeight += pdfConfig.subLineHeight
          doc.text(docWidth - 10, currentHeight, param.business.phone, 'right')
          doc.setFontSize(pdfConfig.fieldTextSize)
          currentHeight += pdfConfig.subLineHeight
          doc.text(docWidth - 10, currentHeight, param.business.email, 'right')
          currentHeight += pdfConfig.subLineHeight
          doc.text(
            docWidth - 10,
            currentHeight,
            param.business.website,
            'right'
          )
          currentHeight += pdfConfig.subLineHeight
          currentHeight += pdfConfig.subLineHeight
          // end header

          doc.line(10, currentHeight, docWidth - 10, currentHeight)

          // Contact part
          currentHeight += pdfConfig.lineHeight
          currentHeight += pdfConfig.lineHeight
          doc.setTextColor(colorGray)
          doc.setFontSize(pdfConfig.fieldTextSize)
          doc.text(10, currentHeight, param.contact.label)

          doc.setTextColor(colorGray)
          doc.setFontSize(pdfConfig.fieldTextSize)
          doc.text(docWidth - 10, currentHeight, param.invoice.invDate, 'right')
          currentHeight += pdfConfig.subLineHeight
          let str = 'Page ' + doc.internal.getNumberOfPages()
          if (typeof doc.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp
          }
          doc.setFontSize(10)

          const pageSize = doc.internal.pageSize
          const pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight()
          doc.text(str, data.settings.margin.left, pageHeight - 10)
          const d = new Date()
          const n = d.toLocaleString()
          doc.text(docWidth - 14, pageHeight - 10, n, 'right')
        },
      })
      let lastheight = doc.lastAutoTable.finalY + 10
      if (param.invoice.invTotal) {
        // doc.line(docWidth / 2, lastheight, docWidth - 10, lastheight)
        // lastheight += pdfConfig.lineHeight
        doc.setFontSize(11)
        doc.text(docWidth - 14, lastheight, param.invoice.invTotal, 'right')
      }
      // row1
      if (param.invoice.row1) {
        lastheight += pdfConfig.lineHeight
        doc.text(docWidth - 14, lastheight, param.invoice.row1, 'right')
      }
      // end row1

      // row2
      if (param.invoice.row2) {
        lastheight += pdfConfig.lineHeight
        doc.text(docWidth - 14, lastheight, param.invoice.row2, 'right')
      }
      // end row2

      doc.setTextColor(colorBlack)
      lastheight += pdfConfig.subLineHeight
      lastheight += pdfConfig.subLineHeight
      doc.setFontSize(pdfConfig.labelTextSize)

      const addInvoiceDesc = () => {
        lastheight += pdfConfig.subLineHeight
        lastheight += pdfConfig.subLineHeight
        doc.setFontSize(pdfConfig.labelTextSize)
        doc.setTextColor(colorBlack)

        doc.text(param.invoice.invDescLabel, 10, lastheight)
        lastheight += pdfConfig.subLineHeight
        lastheight += pdfConfig.subLineHeight
        doc.setTextColor(colorGray)
        doc.setFontSize(pdfConfig.fieldTextSize - 1)

        const lines = doc.splitTextToSize(
          param.invoice.invDesc,
          docWidth - 23,
          {}
        )
        // text in left half
        doc.text(lines, 10, lastheight)
        return lastheight
      }
      addInvoiceDesc()
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp)
      }

      doc.save(props.fileName + '.pdf')
    },
  },
}
