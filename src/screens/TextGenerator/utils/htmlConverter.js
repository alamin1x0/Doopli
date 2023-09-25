export function convertTextToHtml(text) {
    const sections = text.split("\n\n");
    let html = "";

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const lines = section.split("\n");
      const heading = lines[0].trim();
      const subheadings = lines.slice(1).filter((subheading) => subheading.trim() !== "");

      if (heading) {
        html += `<p>${heading}</p>\n`;
      }

      for (const subheading of subheadings) {
        html += `<p>${subheading}</p>\n`;
      }
    }

    return html;
  }