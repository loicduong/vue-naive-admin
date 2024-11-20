import PDF from 'jspdf'

globalThis.onmessage = async (e) => {
  const pdf = new PDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  for (let i = 0; i < e.data.length; i++) {
    if (i > 0) {
      pdf.addPage()
    }

    pdf.addImage(
      e.data[i],
      'PNG',
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight(),
      undefined,
      'FAST',
    )
  }

  globalThis.postMessage(pdf.output('blob'))
}
